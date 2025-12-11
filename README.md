**CS 465 Module Eight Journal – Final Reflection******

**Architecture**

In this project, I used multiple frontend development approaches: Express HTML pages, JavaScript enhancements, and an Angular single-page application (SPA). The Express HTML pages served the customer-facing side and followed a traditional request-response pattern, requiring full page reloads. JavaScript added interactivity and let the browser handle some logic without contacting the server every time.

The Angular SPA worked differently. It updated views dynamically using components, routing, services, and two-way data binding. This gave the admin side a smoother, more application-like experience. While more complex to build, the SPA structure offered better reusability, modularity, and maintainability.

The backend used a NoSQL MongoDB database because its flexible document structure aligns naturally with JSON-based APIs. It allowed rapid iteration without rigid schema requirements and integrates well with Node and Express.

**Functionality**

JSON is a lightweight data format used for storing and transferring information. Unlike JavaScript, JSON does not contain executable code or functions. In this application, JSON served as the communication format between the backend API, the Express frontend, and the Angular SPA. MongoDB also stores data in a JSON-like format, so all parts of the stack communicated consistently.

During the project, I refactored code several times—such as extracting repeated logic into services, simplifying route handlers, reducing duplication in Angular components, and improving naming conventions. 
Reusable UI components provided consistency across the admin interface and made the application easier to update and maintain as features grew.

**Testing**

Testing the API involved verifying that each endpoint correctly handled GET, POST, PUT, and DELETE requests. Tools like Postman were essential for sending test requests and inspecting the responses. After adding authentication, testing became more challenging because protected routes required valid login credentials or tokens.

Working through secured endpoints helped me understand how methods, middleware, and routing work together in a full stack application. It also emphasized the importance of validating requests, protecting data, and ensuring only authorized users can access administrative features.

**Reflection**

This course has helped me build practical full stack development skills that align with my professional goals. I gained experience integrating a frontend, backend, database, and security system into one functioning application. I improved at debugging, API testing, problem-solving, and structuring scalable applications. I also strengthened my abilities in Angular, Express, RESTful APIs, JSON handling, and MongoDB. These skills make me a stronger job candidate and better prepared for real-world development work.
