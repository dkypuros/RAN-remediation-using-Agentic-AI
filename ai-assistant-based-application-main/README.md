# AI Ticket Assistant

[![OpenShift](https://img.shields.io/badge/Deployment-OpenShift-red)](./steps-to-run-on-prem.md)
[![Next.js](https://img.shields.io/badge/Built%20with-Next.js-black)](https://nextjs.org/)
[![Red Hat OpenShift AI](https://img.shields.io/badge/AI-Red%20Hat%20OpenShift%20AI-red)](https://www.redhat.com/en/technologies/cloud-computing/openshift/openshift-ai)

AI Ticket Assistant is an intelligent JIRA ticket management application that leverages AI to analyze historical ticket data, identify patterns, and provide actionable insights to dramatically reduce resolution times and improve support quality.

![AI Ticket Assistant](./public/ai-ticket-assistant-preview.png)

## Key Features

- **AI-Powered Similar Ticket Identification**: Automatically identifies similar past tickets to leverage existing solutions
- **Intelligent Recommendations**: Suggests resolution steps based on historical success patterns
- **Automated Categorization**: Uses AI to properly categorize and prioritize tickets
- **Knowledge Sharing**: Connects support teams with subject matter experts who resolved similar issues
- **Analytics Dashboard**: Provides comprehensive metrics and AI-generated insights
- **Seamless JIRA Integration**: Works with your existing JIRA workflows and data

## Use Cases

- **Telecommunications**: Support for 5G network troubleshooting and operations
- **IT Service Management**: Streamline ticket resolution across IT departments
- **Customer Support**: Improve response times and solution quality
- **Field Service**: Provide AI assistance for technicians in the field
- **DevOps**: Manage and resolve incidents faster with AI insights


## Getting Started

### Prerequisites

- OpenShift CLI (`oc`) installed and configured
- Access to an OpenShift cluster with sufficient permissions
- Git client installed
- Node.js and npm for local development

### Local Development

```bash
# Clone the repository
git clone https://gitlab.consulting.redhat.com/coe-telco-ai-demos/repeatable-demo/ai-assistant-based-application.git
cd ai-assistant-based-application

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at http://localhost:3000

## Red Hat OpenShift AI Integration

### Setting Up OpenShift AI

1. Go to the website: [https://demo.redhat.com](https://demo.redhat.com)

2. Log in using your Red Hat SSO credentials.

3. Order the OpenShift AI catalog item: [RHOAI Catalog](https://catalog.demo.redhat.com/catalog?item=babylon-catalog-prod/sandboxes-gpte.ocp4-composer-ai.prod&utm_source=webapp&utm_medium=share-link)

4. Fill in any required information and submit the order.

5. Wait for the environment to be instantiated. This may take around **30–60 minutes**.

### Accessing the vLLM Server

1. Open the RHOAI dashboard.

2. Navigate to the Model Serving section.

3. Locate the serving runtime named vLLM and get the inference endpoint.

### Testing the API

```bash
curl -X POST "https://vllm-composer-ai-apps.apps.cluster-sptk8.sptk8.sandbox305.opentlc.com/v1/completions" \
-H "Content-Type: application/json" \
-d '{
  "model": "vllm",
  "prompt": "What is artificial intelligence?",
  "max_tokens": 100,
  "temperature": 0.7,
  "stream": false
}'
```

### Connecting the Application to the API

To configure the AI Ticket Assistant to use the vLLM API endpoint:

1. Update the environment variables in your `.env.local` file (for local development) or in the OpenShift deployment configuration:

```
VLLM_API_ENDPOINT=https://vllm-composer-ai-apps.apps.cluster-sptk8.sptk8.sandbox305.opentlc.com/v1/completions
VLLM_API_KEY=your_api_key_if_required
```

2. Restart the application to apply the changes

## Deployment Instructions

This application can be deployed to OpenShift using the configuration files in the `openshift` directory.

### Quick Deployment

For detailed step-by-step deployment instructions, see [OpenShift Deployment Guide](./steps-to-run-on-prem.md).

The deployment process includes:
- Creating a GitLab authentication secret
- Applying OpenShift configuration files (BuildConfig, Deployment, Service, Route)
- Starting the build process
- Monitoring the deployment

## Demo Resources

### Application Screenshots

To see the AI Ticket Assistant in action, check out our [screenshots](./screenshots.md) showing the main features:

- Welcome page with guided setup
- Dashboard with ticket metrics and AI insights
- My Tickets view with AI-powered prioritization
- Ticket creation with automatic similar issue detection
- And more!

### Demo Talk Track

For a guided demonstration of the AI Ticket Assistant, refer to our [Demo Talk Track](./demo/talk-track.md) which includes:

- Introduction and value proposition
- Application walkthrough
- Technical implementation details
- Deployment options
- Industry applications
- Q&A preparation

## Contributing

Contributions to the AI Ticket Assistant are welcome! Please see our [Contributing Guidelines](./CONTRIBUTING.md) for more information.

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](./LICENSE) file for details .