# vLLM API Test Example

## Request

The following curl command sends a completion request to the vLLM API endpoint:

```bash
curl -X POST "https://vllm-composer-ai-apps.apps.cluster-6xklt.6xklt.sandbox59.opentlc.com/v1/completions" \
-H "Content-Type: application/json" \
-d '{
  "model": "vllm",
  "prompt": "What is artificial intelligence?",
  "max_tokens": 100,
  "temperature": 0.7,
  "stream": false
}'
```

## Response

The API returns the following JSON response:

```json
{
  "id": "cmpl-938b490c-5c8d-4e4f-bba6-17f014170d39",
  "object": "text_completion",
  "created": 1745330615,
  "model": "vllm",
  "choices": [
    {
      "index": 0,
      "text": "\n\nArtificial Intelligence (AI) is a branch of computer science that aims to create intelligent machines capable of performing tasks that would normally require human intelligence. These tasks include learning, reasoning, problem-solving, perception, and language understanding.\n\nAI systems are designed to mimic human cognitive functions, enabling them to process large amounts of data, recognize patterns, make decisions, and even learn from their experiences, all without explicit programming for every possible scenario.\n\n",
      "logprobs": null,
      "finish_reason": "length",
      "stop_reason": null,
      "prompt_logprobs": null
    }
  ],
  "usage": {
    "prompt_tokens": 7,
    "total_tokens": 107,
    "completion_tokens": 100,
    "prompt_tokens_details": null
  }
}
```

## Response Content

The model's answer to "What is artificial intelligence?":

> Artificial Intelligence (AI) is a branch of computer science that aims to create intelligent machines capable of performing tasks that would normally require human intelligence. These tasks include learning, reasoning, problem-solving, perception, and language understanding.
> 
> AI systems are designed to mimic human cognitive functions, enabling them to process large amounts of data, recognize patterns, make decisions, and even learn from their experiences, all without explicit programming for every possible scenario.