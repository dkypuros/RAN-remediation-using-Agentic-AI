"""
Simple ReACT Agent for RAN Troubleshooting
Uses pure Python with vLLM for reasoning
"""
import requests
import json
from typing import Dict, List, Any

class RANAgent:
    def __init__(self, vllm_url: str, ran_services_url: str):
        self.vllm_url = vllm_url
        self.ran_services_url = ran_services_url
        self.steps = []  # Track agent workflow steps
        self.retrieved_data = {}  # Track retrieved data
        self.max_iterations = 5

    def log_step(self, step_type: str, action: str, observation: str = None):
        """Log agent workflow step"""
        step = {
            'type': step_type,
            'action': action,
            'observation': observation,
            'step_number': len(self.steps) + 1
        }
        self.steps.append(step)
        print(f"[STEP {step['step_number']}] {step_type}: {action}")
        if observation:
            print(f"         Observation: {observation[:200]}...")

    def call_tool(self, tool_name: str, params: Dict = None) -> Dict:
        """Call a RAN service tool"""
        try:
            if tool_name == "get_alarms":
                url = f"{self.ran_services_url}/api/ran/alarms"
                response = requests.get(url, params=params or {}, timeout=5)

            elif tool_name == "get_kpis":
                site_id = params.get('site_id') if params else None
                if site_id:
                    url = f"{self.ran_services_url}/api/ran/kpis/{site_id}"
                else:
                    url = f"{self.ran_services_url}/api/ran/kpis"
                response = requests.get(url, params=params or {}, timeout=5)

            elif tool_name == "get_cell_details":
                site_id = params.get('site_id', '')
                url = f"{self.ran_services_url}/api/ran/cell-details/{site_id}"
                response = requests.get(url, timeout=5)

            elif tool_name == "search_remediation":
                url = f"{self.ran_services_url}/api/ran/search-remediation"
                response = requests.post(url, json=params or {}, timeout=5)

            else:
                return {'error': f'Unknown tool: {tool_name}'}

            if response.status_code == 200:
                return response.json()
            else:
                return {'error': f'HTTP {response.status_code}: {response.text}'}

        except Exception as e:
            return {'error': str(e)}

    def call_vllm(self, prompt: str, max_tokens: int = 300) -> str:
        """Call vLLM for reasoning"""
        try:
            response = requests.post(
                self.vllm_url,
                json={
                    'model': 'vllm',
                    'prompt': prompt,
                    'max_tokens': max_tokens,
                    'temperature': 0.3,
                    'stop': ['Observation:', 'User:', '\n\n\n']
                },
                timeout=30
            )

            if response.status_code == 200:
                data = response.json()
                return data.get('choices', [{}])[0].get('text', '').strip()
            else:
                return f"Error: vLLM returned status {response.status_code}"

        except Exception as e:
            return f"Error calling vLLM: {str(e)}"

    def parse_action(self, thought_text: str) -> tuple:
        """Parse action from agent's thought"""
        # Simple parsing - look for Action: and Action Input:
        lines = thought_text.split('\n')

        action = None
        action_input = None

        for i, line in enumerate(lines):
            if line.startswith('Action:'):
                action = line.replace('Action:', '').strip()
            elif line.startswith('Action Input:'):
                # Get the rest of the text as action input
                action_input = line.replace('Action Input:', '').strip()
                # If action input spans multiple lines, get them
                for j in range(i+1, len(lines)):
                    if lines[j].strip() and not lines[j].startswith('Action'):
                        action_input += ' ' + lines[j].strip()
                    else:
                        break

        return action, action_input

    def process_query(self, user_query: str) -> Dict:
        """Process user query using ReACT framework"""
        self.steps = []
        self.retrieved_data = {}

        system_prompt = """You are an expert RAN (Radio Access Network) troubleshooting agent. Your goal is to help diagnose and resolve network issues.

You have access to these tools:
- get_alarms: Retrieve active alarms from the network
- get_kpis: Get Key Performance Indicators for sites
- get_cell_details: Get detailed cell-level RF metrics
- search_remediation: Search for remediation playbooks based on symptoms

Use the ReACT framework:
1. Thought: Reason about what you need to do
2. Action: Choose a tool to use
3. Action Input: Specify the input for the tool
4. Observation: The tool will return data
5. Repeat until you have enough information
6. Final Answer: Provide your conclusion and recommendations

Format your response exactly like this:
Thought: [your reasoning]
Action: [tool name]
Action Input: [input for the tool]

After seeing the observation, either:
- Continue with another Thought/Action/Action Input
- Or provide: Final Answer: [your complete response]
"""

        conversation_history = f"{system_prompt}\n\nUser Question: {user_query}\n\n"

        for iteration in range(self.max_iterations):
            # Get agent's next thought/action
            self.log_step("REASONING", f"Iteration {iteration + 1}: Thinking about next step...")

            response = self.call_vllm(conversation_history, max_tokens=400)

            # Check if agent wants to give final answer
            if "Final Answer:" in response:
                final_answer = response.split("Final Answer:")[1].strip()
                self.log_step("FINAL_ANSWER", "Providing conclusion", final_answer)
                break

            # Parse action
            action, action_input = self.parse_action(response)

            if not action:
                # If we can't parse an action, provide default final answer
                final_answer = "I apologize, but I'm having trouble formulating a proper response. Please try rephrasing your question."
                self.log_step("ERROR", "Could not parse action", response)
                break

            # Execute action
            self.log_step("ACTION", f"{action} with input: {action_input}")

            # Prepare tool parameters
            tool_params = {}
            if action == "get_alarms":
                if "CRITICAL" in action_input.upper():
                    tool_params = {'severity': 'CRITICAL'}
                elif "SITE-" in action_input.upper():
                    # Extract site ID
                    import re
                    match = re.search(r'SITE-\d+', action_input.upper())
                    if match:
                        tool_params = {'site_id': match.group()}

            elif action == "get_kpis":
                if "SITE-" in action_input.upper():
                    import re
                    match = re.search(r'SITE-\d+', action_input.upper())
                    if match:
                        tool_params = {'site_id': match.group()}

            elif action == "get_cell_details":
                import re
                match = re.search(r'SITE-\d+', action_input.upper())
                if match:
                    tool_params = {'site_id': match.group()}

            elif action == "search_remediation":
                # Parse symptoms from action input
                tool_params = {
                    'alarm_type': action_input,
                    'symptoms': [action_input]
                }

            # Call the tool
            result = self.call_tool(action, tool_params)
            self.retrieved_data[action] = result

            # Format observation
            observation = json.dumps(result, indent=2)[:1000]  # Limit size
            self.log_step("OBSERVATION", f"Tool returned data", observation)

            # Add to conversation
            conversation_history += f"Thought: {response}\nObservation: {observation}\n\n"

        else:
            # Max iterations reached
            final_answer = "I've gathered the available information but need more iterations to provide a complete analysis. Based on what I found so far, please review the retrieved data in the tabs."

        return {
            'answer': final_answer,
            'steps': self.steps,
            'retrieved_data': self.retrieved_data
        }
