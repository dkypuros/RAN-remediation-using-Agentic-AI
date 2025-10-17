# API Type Design

## Motivation
The goal of this project is to integrate a standalone vLLM inference server with a Next.js application, using NestJS as a wrapper. To achieve this, we need to carefully manage the type system across the different components.

## Approach

### Separation of Concerns
1. **vLLM (Python)**: The vLLM server will be implemented in Python and will expose an OpenAI-compatible API. This layer will be completely isolated from the TypeScript-based components.
2. **NestJS (TypeScript)**: The NestJS application will act as a wrapper around the vLLM server, providing additional features like authentication, rate-limiting, and request handling.
3. **Next.js (TypeScript)**: The Next.js application will be the client, making API calls to the NestJS server.

### Type Management
1. **API Contracts**: The communication between vLLM and NestJS will be defined using JSON schemas, which will serve as the API contract. This ensures a clear separation between the Python and TypeScript components.
2. **Shared Types**: Between NestJS and Next.js, we will maintain a `types/` directory that contains shared TypeScript types, such as API request/response interfaces, shared models, and enums.
3. **Isolated Types**: Each component (vLLM, NestJS, Next.js) will have its own set of types that are specific to its domain and implementation details. These types will not be shared across components.

### Benefits
1. **Separation of Concerns**: By keeping the type systems separate, we avoid tight coupling between the different components and maintain a clear separation of responsibilities.
2. **Type Safety**: The shared TypeScript types between NestJS and Next.js provide end-to-end type safety, ensuring consistency and reducing the risk of errors.
3. **Flexibility**: The API contract-based approach allows us to easily swap out the vLLM implementation or upgrade it without affecting the TypeScript-based components.
4. **Maintainability**: The modular structure and clear boundaries make the codebase more maintainable and easier to reason about.

## Next Steps
1. Finalize the API contract schemas for the vLLM server.
2. Implement the NestJS wrapper, using the API contract types.
3. Develop the Next.js client, leveraging the shared TypeScript types.
4. Ensure seamless integration and end-to-end type safety across the components.
