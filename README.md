**Overview**

In this module, the Travlr Getaways web application was enhanced to dynamically render customer-facing pages using Handlebars (HBS) and JSON data. The static content from the previous module was refactored to follow a true Model–View–Controller (MVC) pattern, making the application more modular, scalable, and aligned with full-stack architecture standards.

**Key Updates for Module 3**

1. Dynamic Data Source: Added a trips.json file to store all travel package information.
2. Controller Refactor: Updated traveler.js to read live data from trips.json instead of using hard-coded arrays.
3. Templating Enhancements: Introduced a reusable Handlebars partial, trip-card.hbs, to simplify trip rendering in travel-list.hbs.
4. Architecture Validation: Verified that routes (/travel/list) correctly call controllers and render dynamic views.
5. Testing: Confirmed that all trip data displays dynamically and that static HTML successfully transitioned to JSON-driven content.
