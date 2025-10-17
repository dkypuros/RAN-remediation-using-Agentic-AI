# AI Ticket Assistant Test Questions

This document contains a set of test questions to verify the functionality of the RAG-enhanced AI Ticket Assistant. These questions are designed to test different aspects of the system, from basic functionality to edge cases.

## Basic Functionality Questions

1. "How can I create a new ticket?"
2. "What's the status of my pending tickets?"
3. "Show me tickets assigned to me"
4. "How do I assign a ticket to another team member?"
5. "What is the priority level of ticket JIRA-1234?"
6. "How do I change the status of a ticket?"

## Authentication Issues Questions

7. "I'm having trouble logging into the production API"
8. "The authentication token keeps expiring too quickly"
9. "Users are getting 401 errors when accessing the customer portal"
10. "How do I reset my API credentials?"
11. "What authentication methods are supported by our APIs?"
12. "We're seeing intermittent authentication failures during peak hours"

## Database Connection Questions

13. "Database connection keeps dropping in the staging environment"
14. "How do I troubleshoot slow database queries?"
15. "We're seeing timeout errors when connecting to the database cluster"
16. "What's the procedure for database failover?"
17. "How do I optimize database connections for our microservices?"

## API Rate Limiting Questions

18. "Our API calls are being rate limited"
19. "How do we increase the API rate limits for our enterprise customers?"
20. "What's the current rate limit configuration for our public APIs?"
21. "We're seeing 429 Too Many Requests errors during batch processing"

## Complex Technical Questions (RAG Testing)

22. "How do we resolve the certificate rotation issues affecting our authentication service?"
23. "What was the resolution for the last major database connection failure we had?"
24. "How did we solve the API rate limiting issue during the last product launch?"
25. "What configuration changes were made to fix the timeout issues in the payment processing system?"
26. "How can we implement the same caching solution that worked for the user profile service?"

## Edge Cases and Error Handling

27. "" (empty query to test error handling)
28. "@#$%^&*" (special characters to test input sanitization)
29. "This is a very long question that continues for multiple paragraphs to test how the system handles extremely verbose inputs that might contain a lot of irrelevant information mixed with the actual query buried somewhere in the middle of all this text. The question is about how to handle API authentication but it's intentionally verbose to test length limits." (very long query)
30. "API+authentication+error+logs+showing+repeated+failures" (keyword-style query)

## System and Meta Questions

31. "What information sources are you using to answer my questions?"
32. "How recent is your knowledge about our ticketing system?"
33. "Can you show me how you determined the similar tickets?"
34. "What confidence do you have in your answer?"
35. "How do I provide feedback on the accuracy of your responses?"

## Testing Both Demo and API Modes

For comprehensive testing, run each question in both demo mode and API mode to compare responses and verify proper integration with the RAG service.