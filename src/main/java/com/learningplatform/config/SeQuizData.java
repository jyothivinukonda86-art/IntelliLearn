package com.learningplatform.config;

import com.learningplatform.config.QuizSeed.QuestionSeed;

public class SeQuizData {

    // ================= CHAPTER 1: Software Lifecycle & Agile Methodologies =================
    public static QuizSeed getCh1Easy() {
        return new QuizSeed(
                "SE Ch 1: SDLC Fundamentals (Easy)",
                "Software development lifecycle phases, Waterfall model, and core Agile concepts.",
                "EASY",
                5,
                new QuestionSeed[] {
                        new QuestionSeed("What does SDLC stand for in software engineering?",
                                "Software Development Life Cycle", "System Design and Logic Coding", "Standard Database Layer Control", "Structured Deployment Language Compiler",
                                "A", "SDLC stands for Software Development Life Cycle, representing the structured framework for planning, developing, testing, and deploying software."),
                        new QuestionSeed("Which classic SDLC model follows a strict linear, non-overlapping sequential progression of phases?",
                                "Waterfall Model", "Agile Scrum", "Extreme Programming (XP)", "Kanban",
                                "A", "The Waterfall model proceeds sequentially through requirements, design, implementation, verification, and maintenance with minimal backtracking."),
                        new QuestionSeed("In Scrum, what is a timeboxed iteration typically lasting 1 to 4 weeks called?",
                                "Sprint", "Epic", "Milestone", "Release Train",
                                "A", "A Sprint is a fixed-duration timebox (usually 2 weeks) during which the Scrum team delivers a potentially releasable product increment."),
                        new QuestionSeed("Who is responsible for maximizing the value of the product and managing the Product Backlog in Scrum?",
                                "Product Owner", "Scrum Master", "Lead Developer", "QA Manager",
                                "A", "The Product Owner is solely responsible for defining user stories, prioritizing the product backlog, and ensuring the product delivers maximum business value."),
                        new QuestionSeed("What is a User Story in Agile methodologies?",
                                "A short requirement written from the perspective of an end user describing a goal and benefit", "A technical documentation specification document", "A bug report submitted by customers", "A database ER diagram",
                                "A", "User stories follow the format 'As a [user], I want [goal], so that [benefit]', focusing on value delivered to the user rather than implementation details.")
                }
        );
    }

    public static QuizSeed getCh1Medium() {
        return new QuizSeed(
                "SE Ch 1: Agile Ceremonies & Requirements Engineering (Medium)",
                "Daily standups, sprint reviews, retrospectives, story points, and functional vs non-functional requirements.",
                "MEDIUM",
                10,
                new QuestionSeed[] {
                        new QuestionSeed("What is the primary objective of a Sprint Retrospective ceremony?",
                                "Reflect on the past sprint to identify process improvements and actionable team adjustments", "Demo completed features to external stakeholders", "Assign story point estimates to new backlog items", "Review code pull requests",
                                "A", "The Sprint Retrospective occurs at the end of each sprint to inspect how the team worked together and identify concrete ways to improve efficiency and team dynamics."),
                        new QuestionSeed("What is the difference between Functional and Non-Functional Requirements?",
                                "Functional requirements define what the system should do; Non-functional requirements define system qualities (performance, security, scalability)", "Functional requirements are written in code; Non-functional are written in English", "Non-functional requirements are optional features", "Functional requirements only apply to frontend interfaces",
                                "A", "Functional requirements specify features and behavior (e.g., user login, checkout); non-functional requirements specify architectural constraints and qualities (e.g., latency < 200ms, 99.99% uptime)."),
                        new QuestionSeed("What do Story Points represent in Agile estimation?",
                                "Relative measure of effort, complexity, and uncertainty rather than absolute calendar hours", "The number of hours a senior engineer will spend coding", "The cost of cloud infrastructure for a feature", "The number of lines of code to write",
                                "A", "Story points estimate the relative effort, complexity, and risk of completing a backlog item compared to a baseline user story."),
                        new QuestionSeed("What is a Burndown Chart used for in Scrum project management?",
                                "Tracking remaining estimated effort/story points across the sprint timebox toward the sprint goal", "Measuring server CPU temperature under load", "Visualizing automated test coverage percentage", "Calculating employee salary bonuses",
                                "A", "A sprint burndown chart shows the remaining work in story points day-by-day, helping the team forecast whether they will complete their sprint commitment."),
                        new QuestionSeed("What is the INVEST mnemonic used for in Agile requirements engineering?",
                                "Independent, Negotiable, Valuable, Estimable, Small, Testable criteria for high-quality user stories", "An investment formula for venture capital funding", "A database indexing guideline", "A continuous deployment validation pipeline",
                                "A", "INVEST defines characteristics of effective user stories: Independent, Negotiable, Valuable, Estimable, Small, and Testable."),
                        new QuestionSeed("What is the primary role of the Scrum Master?",
                                "Facilitate Scrum ceremonies, remove team impediments, and coach the team on Agile practices as a servant-leader", "Assign daily coding tasks to software engineers", "Approve product roadmaps and budgets", "Write automated unit tests for pull requests",
                                "A", "The Scrum Master is a servant-leader who helps the team follow Scrum values, removes blockers, and shields the team from external interruptions."),
                        new QuestionSeed("What is the key principle of the Kanban methodology compared to Scrum?",
                                "Continuous flow with Work In Progress (WIP) limits and no required fixed-duration sprints", "Strict 2-week iterations with mandatory point estimates", "Waterfall milestones with Gantt chart dependencies", "No documentation or backlog grooming allowed",
                                "A", "Kanban focuses on visualizing workflow, limiting Work In Progress (WIP) to prevent bottlenecks, and managing continuous flow rather than timeboxed sprints.")
                }
        );
    }

    public static QuizSeed getCh1Hard() {
        return new QuizSeed(
                "SE Ch 1: Advanced Methodologies & Enterprise Agile (Hard)",
                "SAFe, LeSS, BDD, TDD cycles, requirements traceability matrices, and technical debt.",
                "HARD",
                15,
                new QuestionSeed[] {
                        new QuestionSeed("What is the Red-Green-Refactor cycle in Test-Driven Development (TDD)?",
                                "Write a failing test (Red), write minimal code to pass (Green), and optimize structure without changing behavior (Refactor)", "Deploy to staging (Red), test manually (Green), deploy to production (Refactor)", "Highlight syntax errors in red, compile in green, push to git", "Review pull requests with red flags, merge on green approval",
                                "A", "TDD follows three steps: first write an automated test that fails (Red), write the minimal code required to pass (Green), and refactor for clean design and performance (Refactor)."),
                        new QuestionSeed("What is the primary objective of Behavior-Driven Development (BDD)?",
                                "Bridge communication between domain experts and engineers using ubiquitous Given-When-Then natural language specifications", "Ensure 100% bytecode coverage by unit tests", "Replace integration tests with mock objects", "Automate database schema migrations in SQL",
                                "A", "BDD uses structured natural language (Gherkin syntax: Given, When, Then) to express executable specifications that both stakeholders and developers understand."),
                        new QuestionSeed("What does 'Technical Debt' represent in software engineering economics?",
                                "The implied cost of additional future rework caused by choosing an easy or expedient solution now instead of a better approach", "Outstanding cloud hosting invoices from AWS or GCP", "The monetary cost of hiring contract developers", "Depreciation of physical server hardware",
                                "A", "Technical debt refers to shortcuts taken during development that provide short-term velocity but incur ongoing interest in terms of increased maintenance complexity and reduced agility."),
                        new QuestionSeed("What is the core coordination mechanism for scaling Agile across many teams in SAFe (Scaled Agile Framework)?",
                                "Program Increment (PI) Planning and the Agile Release Train (ART)", "Weekly all-hands meetings with company executives", "A single unified Git monorepo for all applications", "Daily synchronous 3-hour standups",
                                "A", "SAFe synchronizes multiple cross-functional teams onto an Agile Release Train (ART) through cadence-based Program Increment (PI) planning events."),
                        new QuestionSeed("What is a Requirements Traceability Matrix (RTM)?",
                                "A grid linking user requirements through design, implementation, and test cases to ensure complete test coverage and change impact analysis", "A matrix multiplying test execution times", "An entity-relationship schema of user profiles", "A git branching history visualization",
                                "A", "An RTM maps each functional requirement to its corresponding code modules and test cases, verifying that every requirement is tested and no unnecessary features are added."),
                        new QuestionSeed("What is the 'Spike' in Agile terminology?",
                                "A timeboxed research or prototyping task used to resolve technical uncertainty before committing to a user story", "A sudden unexpected spike in web server traffic", "A high-severity production bug requiring immediate patching", "A steep decrease in sprint burndown velocity",
                                "A", "A spike is an experimental investigation with a strict timebox to explore solutions, evaluate libraries, or clarify architectural risks."),
                        new QuestionSeed("What does the Cynefin Framework help software engineering leaders evaluate?",
                                "Classifying problem domains (Clear, Complicated, Complex, Chaotic) to choose appropriate management and development approaches", "Determining salary bands for engineering levels", "Benchmarking database throughput under stress", "Selecting frontend JavaScript frameworks",
                                "A", "Cynefin helps decision makers categorize situations into Clear, Complicated, Complex, and Chaotic contexts to determine whether Waterfall, Agile, or rapid triage is warranted."),
                        new QuestionSeed("How does LeSS (Large-Scale Scrum) differ fundamentally from SAFe?",
                                "LeSS keeps single Product Owner and single Product Backlog across multiple teams, minimizing extra management overhead and rules", "LeSS requires teams to use Waterfall milestones", "LeSS only works with mobile applications", "LeSS eliminates automated testing",
                                "A", "LeSS scales Scrum by keeping it simple—one Product Owner, one Product Backlog, and shared Sprint Planning across 2–8 teams without introducing new managerial layers."),
                        new QuestionSeed("What is the 'Cone of Uncertainty' in software project estimation?",
                                "A concept illustrating that project estimates are highly variable in early phases and narrow down as requirements and architecture solidify", "A triangular model for test pyramid prioritization", "A risk matrix evaluating third-party software licenses", "A visual model of technical debt accumulation",
                                "A", "The Cone of Uncertainty shows that initial project estimates can vary by up to 4x, narrowing progressively toward 1.0x as actual development and design choices progress."),
                        new QuestionSeed("What characterizes the Spiral SDLC model proposed by Barry Boehm?",
                                "Risk-driven iterations combining iterative development with systematic risk assessment and mitigation at each cycle", "Continuous deployment to production after every commit", "Purely sequential phases with fixed price contracts", "Peer programming with strict test-first rules",
                                "A", "The Spiral model is risk-driven: each loop involves objective determination, risk identification and mitigation, development/validation, and planning for the next phase.")
                }
        );
    }

    // ================= CHAPTER 2: Object-Oriented Design & Architectural Patterns =================
    public static QuizSeed getCh2Easy() {
        return new QuizSeed(
                "SE Ch 2: OOP Principles & Clean Code (Easy)",
                "Encapsulation, inheritance, polymorphism, abstraction, and basic SOLID rules.",
                "EASY",
                5,
                new QuestionSeed[] {
                        new QuestionSeed("Which object-oriented principle bundles data and the methods that manipulate that data together while hiding internal state?",
                                "Encapsulation", "Polymorphism", "Inheritance", "Coupling",
                                "A", "Encapsulation restricts direct access to some of an object's components, preventing unintended interference and protecting state integrity."),
                        new QuestionSeed("What does the 'S' stand for in the SOLID design principles?",
                                "Single Responsibility Principle", "System Scalability Principle", "Sequential Processing Principle", "Synchronous Execution Principle",
                                "A", "The Single Responsibility Principle (SRP) states that a class should have one, and only one, reason to change."),
                        new QuestionSeed("Which design pattern ensures that a class has only one instance and provides a global access point to it?",
                                "Singleton Pattern", "Factory Pattern", "Observer Pattern", "Adapter Pattern",
                                "A", "The Singleton pattern restricts class instantiation to a single object, commonly used for database connection pools or configuration managers."),
                        new QuestionSeed("What does the Open/Closed Principle (O in SOLID) dictate?",
                                "Software entities should be open for extension, but closed for modification", "Methods should open database connections and close them immediately", "Classes should be open source and closed to proprietary use", "Files must be closed after every read operation",
                                "A", "The Open/Closed Principle means you should be able to add new functionality without changing existing, tested source code (typically via inheritance or interfaces)."),
                        new QuestionSeed("Which Gang of Four pattern category do Singleton, Factory Method, and Builder belong to?",
                                "Creational Patterns", "Structural Patterns", "Behavioral Patterns", "Architectural Patterns",
                                "A", "Creational patterns deal with object creation mechanisms, creating objects in a manner suitable to the situation without exposing instantiation logic.")
                }
        );
    }

    public static QuizSeed getCh2Medium() {
        return new QuizSeed(
                "SE Ch 2: Design Patterns & SOLID in Practice (Medium)",
                "Liskov Substitution, Dependency Inversion, Observer, Decorator, Strategy, and Factory patterns.",
                "MEDIUM",
                10,
                new QuestionSeed[] {
                        new QuestionSeed("What does the Liskov Substitution Principle (L in SOLID) require?",
                                "Subtypes must be substitutable for their base types without altering program correctness", "Classes must implement at least two interfaces", "Subclasses must override every method of the parent", "Derived classes must not throw exceptions",
                                "A", "LSP guarantees that any code expecting an instance of a base type T will function correctly when provided an instance of subtype S without unexpected side-effects."),
                        new QuestionSeed("Which design pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable at runtime?",
                                "Strategy Pattern", "Decorator Pattern", "Facade Pattern", "State Pattern",
                                "A", "The Strategy pattern enables selecting an algorithm's behavior at runtime (e.g., swapping payment processors or sorting algorithms) through composition."),
                        new QuestionSeed("What is the primary intent of the Decorator Pattern?",
                                "Attach additional responsibilities to an object dynamically without subclassing", "Convert the interface of a class into another interface clients expect", "Provide a simplified interface to a complex subsystem", "Separate an abstraction from its implementation",
                                "A", "The Decorator pattern wraps an object in another object to dynamically add behavior or state (e.g., Java's BufferedReader wrapping InputStreamReader)."),
                        new QuestionSeed("What does the Dependency Inversion Principle (D in SOLID) state?",
                                "High-level modules should not depend on low-level modules; both should depend on abstractions", "Classes must depend directly on concrete database drivers", "Inversion of control containers must be used in all projects", "Frontend code must directly call database tables",
                                "A", "DIP states that high-level business logic should depend on abstract interfaces rather than concrete low-level implementations, promoting loose coupling."),
                        new QuestionSeed("Which design pattern defines a one-to-many dependency so that when one object changes state, all dependents are notified?",
                                "Observer Pattern", "Mediator Pattern", "Command Pattern", "Chain of Responsibility",
                                "A", "The Observer pattern establishes a publish-subscribe relationship where subject state changes trigger automatic notifications to all registered observer listeners."),
                        new QuestionSeed("What is the difference between Loose Coupling and High Cohesion?",
                                "Coupling measures interdependence between different modules; Cohesion measures how focused and related elements are within a single module", "Cohesion is between different services; Coupling is inside a single function", "They are identical software engineering terms", "High coupling and low cohesion is the ideal clean architecture goal",
                                "A", "Good software architecture aims for Low Coupling (minimal dependencies between classes) and High Cohesion (all parts of a module work toward a single well-defined purpose)."),
                        new QuestionSeed("Which structural pattern provides a simplified, unified interface to a complex subsystem of classes?",
                                "Facade Pattern", "Adapter Pattern", "Proxy Pattern", "Flyweight Pattern",
                                "A", "The Facade pattern wraps a complex system of classes behind a single simple method call, shielding client code from complex underlying subsystems.")
                }
        );
    }

    public static QuizSeed getCh2Hard() {
        return new QuizSeed(
                "SE Ch 2: Enterprise Architecture & Distributed Patterns (Hard)",
                "Clean Architecture, Hexagonal / Ports & Adapters, CQRS, Event Sourcing, and Saga pattern.",
                "HARD",
                15,
                new QuestionSeed[] {
                        new QuestionSeed("What is the Core Dependency Rule in Uncle Bob's Clean Architecture?",
                                "Source code dependencies must point only inward, toward higher-level policies and enterprise domain entities", "Frontend code must depend on database entities directly", "Dependencies must form a circular ring across all layers", "Frameworks must control core business logic",
                                "A", "The Clean Architecture Dependency Rule states that inner layers (entities, use cases) know nothing about outer layers (UI, frameworks, databases, devices)."),
                        new QuestionSeed("What is the architectural purpose of Ports and Adapters (Hexagonal Architecture)?",
                                "Isolate core domain application logic from external technologies, frameworks, and databases via ports (interfaces) and adapters (implementations)", "Allow multi-threading using six CPU cores simultaneously", "Replace microservices with modular monoliths", "Enforce network firewalls around REST endpoints",
                                "A", "Hexagonal architecture creates loosely coupled application components that can be connected to their software environment by means of ports and adapters."),
                        new QuestionSeed("What does CQRS (Command Query Responsibility Segregation) separate?",
                                "Read models (queries) from write models (commands / state mutations) into distinct data structures or services", "Frontend React components from backend Spring controllers", "SQL queries from NoSQL document lookups", "Synchronous HTTP calls from asynchronous WebSocket frames",
                                "A", "CQRS separates read and update operations for a data store, optimizing queries for high-speed reporting while tailoring commands for transactional business rules."),
                        new QuestionSeed("In Event Sourcing, how is the state of an application entity stored?",
                                "As a sequence of immutable state-changing events appended over time rather than just updating the current state column", "In an in-memory Redis key-value cache that expires every 24 hours", "In a single denormalized JSON column on the users table", "As serialized Java byte arrays stored in binary blobs",
                                "A", "Event Sourcing persists the full history of domain events; the current application state is reconstructed by replaying all historical events from genesis."),
                        new QuestionSeed("How does the Saga Pattern manage distributed transactions across microservices?",
                                "Coordinates a sequence of local transactions where each step publishes an event that triggers the next, executing compensating transactions on failure", "Acquires distributed two-phase locks across all microservice databases simultaneously", "Reverts database commits using hardware memory snapshots", "Restarts all microservices when any service throws an error",
                                "A", "The Saga pattern maintains data consistency in distributed systems without distributed ACID locks by executing compensating rollback actions if a step fails."),
                        new QuestionSeed("What does the Outbox Pattern solve in event-driven microservices architectures?",
                                "Guarantees dual-write consistency by saving domain entities and outbox events in the same local database transaction before publishing to the message broker", "Deletes outgoing emails if SMTP servers are offline", "Compacts Kafka message logs automatically", "Converts REST requests into gRPC protocol buffers",
                                "A", "The Transactional Outbox pattern ensures that database updates and message broker publication happen atomically without distributed two-phase commit overhead."),
                        new QuestionSeed("What is the Circuit Breaker pattern designed to prevent in microservices?",
                                "Cascading system failures by failing fast when a remote service is unresponsive rather than exhausting thread pools and connections", "SQL injection attacks against internal microservices", "Memory leaks in garbage-collected virtual machines", "Data duplication across database read replicas",
                                "A", "The Circuit Breaker trips to Open state when failure thresholds are crossed, rejecting subsequent requests immediately without wasting server threads waiting for timeouts."),
                        new QuestionSeed("What is the difference between Orchestration and Choreography in distributed sagas?",
                                "Orchestration uses a centralized coordinator directing participants; Choreography relies on services reacting autonomously to domain events", "Choreography is synchronous; Orchestration is purely asynchronous", "Orchestration does not support compensating transactions", "Choreography requires an API Gateway",
                                "A", "In saga orchestration, a centralized orchestrator tells participants what actions to run; in choreography, each service listens for events and decides its own action."),
                        new QuestionSeed("What is the Strangler Fig Pattern in legacy software modernization?",
                                "Incrementally replacing specific features of a legacy system with new services until the legacy system is completely phased out", "Completely deleting the legacy codebase on day one and rebuilding from scratch", "Freezing code changes to prevent regressions", "Wrapping old SQL queries in stored procedures",
                                "A", "The Strangler Fig pattern gradually replaces pieces of legacy functionality with modern microservices around the edges until the old monolith can be retired safely."),
                        new QuestionSeed("What does the Anti-Corruption Layer (ACL) pattern do in Domain-Driven Design (DDD)?",
                                "Translates and mediates data between two differing bounded contexts to prevent legacy models from corrupting the new domain model", "Scans code for security vulnerabilities and CVEs during build time", "Enforces TLS 1.3 encryption between microservices", "Restricts database write access to administrators only",
                                "A", "An Anti-Corruption Layer translates between two subsystems with different domain models, preventing external legacy concepts from leaking into clean domain models.")
                }
        );
    }

    // ================= CHAPTER 3: Quality Assurance, DevOps & CI/CD =================
    public static QuizSeed getCh3Easy() {
        return new QuizSeed(
                "SE Ch 3: QA & DevOps Fundamentals (Easy)",
                "Testing levels, continuous integration, version control with Git, and deployment basics.",
                "EASY",
                5,
                new QuestionSeed[] {
                        new QuestionSeed("What type of testing validates individual units, functions, or methods in isolation?",
                                "Unit Testing", "System Testing", "Acceptance Testing", "Load Testing",
                                "A", "Unit testing verifies that individual functions, methods, or classes execute as expected in isolation from external dependencies."),
                        new QuestionSeed("What does CI/CD stand for in modern software engineering?",
                                "Continuous Integration and Continuous Delivery / Deployment", "Code Inspection and Central Distribution", "Cloud Infrastructure and Container Design", "Centralized Indexing and Core Development",
                                "A", "CI/CD stands for Continuous Integration (frequent merging and automated testing of code) and Continuous Delivery/Deployment (automated release to production)."),
                        new QuestionSeed("What is the primary purpose of Version Control Systems like Git?",
                                "Track code changes, enable collaborative branch development, and maintain project history", "Automatically optimize database queries", "Host web servers in the cloud", "Scan code for grammatical spelling errors",
                                "A", "Version control systems record changes to files over time, enabling developers to collaborate, branch, merge, and rollback code safely."),
                        new QuestionSeed("What does Regression Testing verify after new features or bugfixes are introduced?",
                                "That previously working features have not been broken or degraded by the changes", "That the application compiles under 5 seconds", "That all team members approved the pull request", "That database disk storage is below 80%",
                                "A", "Regression testing reruns existing test suites to confirm that recent code changes have not introduced new bugs into existing functionality."),
                        new QuestionSeed("Which Git command creates a new isolated line of development to work on a feature?",
                                "git branch", "git commit", "git push", "git clone",
                                "A", "The 'git branch <branch-name>' command creates an independent branch where developers can work on new features without impacting the main branch.")
                }
        );
    }

    public static QuizSeed getCh3Medium() {
        return new QuizSeed(
                "SE Ch 3: Automated Testing & Continuous Pipelines (Medium)",
                "Test pyramid, mock objects vs stubs, code coverage metrics, Docker containers, and blue-green deployments.",
                "MEDIUM",
                10,
                new QuestionSeed[] {
                        new QuestionSeed("According to the classic Test Pyramid model, what should constitute the largest proportion of an automated test suite?",
                                "Fast, isolated Unit Tests at the base", "Manual end-to-end tests at the top", "UI Selenium tests in the middle", "Performance load tests",
                                "A", "The test pyramid emphasizes a wide base of fast, reliable unit tests, a moderate layer of integration tests, and a small peak of end-to-end UI tests."),
                        new QuestionSeed("What is the difference between a Mock and a Stub in automated testing?",
                                "A Stub provides pre-programmed answers to calls; a Mock also verifies that expected method interactions actually occurred", "Mocks run on production servers; Stubs run locally", "Stubs test databases; Mocks test user interfaces", "There is no difference in testing terminology",
                                "A", "Stubs provide canned responses to test calls, whereas mocks set expectations on method calls (arguments, count, order) and verify those interactions."),
                        new QuestionSeed("What does Code Coverage measure in test suites, and what is its limitation?",
                                "The percentage of lines or branches executed during tests; high coverage does not guarantee test assertions are meaningful or correct", "The number of comments written per class", "The speed of test execution in milliseconds", "The size of the compiled binary file",
                                "A", "Code coverage measures which code lines were reached during test runs, but 100% line coverage can still miss edge cases and logic bugs if assertions are weak."),
                        new QuestionSeed("What is Blue-Green Deployment strategy?",
                                "Running two identical production environments (Blue and Green); one serves live traffic while the new version is deployed to the other, switching router traffic instantly", "Deploying software on alternating days of the week", "Deploying only to open-source operating systems", "A testing technique where tests are written in blue and code in green",
                                "A", "Blue-Green deployment minimizes downtime and risk by having two identical production environments, switching live router traffic to the newly verified environment."),
                        new QuestionSeed("What is the primary benefit of containerizing applications using Docker?",
                                "Consistent runtime environment across development, testing, and production environments, eliminating 'works on my machine' issues", "Accelerating CPU hardware clock speeds", "Eliminating the need for database backups", "Replacing all operating system kernels with web browsers",
                                "A", "Docker packages the application together with its runtime, system tools, libraries, and settings, ensuring identical execution across all environments."),
                        new QuestionSeed("What is a Canary Release in software delivery?",
                                "Rolling out a new version to a small subset of users (e.g., 5%) to validate stability before rolling out to the entire user base", "A release deployed exclusively to company employees on weekends", "A release where all database records are backed up to tape", "A deprecated release that is scheduled for deletion",
                                "A", "A canary deployment exposes a new release to a tiny percentage of live traffic to monitor error rates and performance metrics before widespread rollout."),
                        new QuestionSeed("What is Mutation Testing in software quality assurance?",
                                "Intentionally introducing synthetic faults (mutants) into source code to verify whether the test suite detects and fails them", "Changing database column names dynamically at runtime", "Testing genetic algorithms on distributed clusters", "Testing applications under extreme hardware radiation",
                                "A", "Mutation testing evaluates test suite quality by injecting small faults (mutants) into the code; if the test suite passes, the mutant survived, indicating weak test assertions.")
                }
        );
    }

    public static QuizSeed getCh3Hard() {
        return new QuizSeed(
                "SE Ch 3: Advanced DevOps, Observability & Site Reliability (Hard)",
                "GitOps, Infrastructure as Code, Chaos Engineering, Distributed Tracing (OpenTelemetry), and DORA metrics.",
                "HARD",
                15,
                new QuestionSeed[] {
                        new QuestionSeed("What are the four core DORA (DevOps Research and Assessment) metrics for engineering performance?",
                                "Deployment Frequency, Lead Time for Changes, Change Failure Rate, Time to Restore Service (MTTR)", "Lines of Code, Code Review Comments, Hours Worked, Bugs Filed", "Test Coverage, Cyclomatic Complexity, Memory Usage, Disk I/O", "Number of Sprints, Story Points Completed, Velocity, Backlog Count",
                                "A", "DORA identified Deployment Frequency, Lead Time for Changes, Change Failure Rate, and Mean Time to Restore (MTTR) as key indicators of high-performing engineering teams."),
                        new QuestionSeed("What is the fundamental principle of Infrastructure as Code (IaC) using tools like Terraform?",
                                "Defining, provisioning, and managing computing infrastructure using declarative configuration files tracked in version control", "Writing server firmware in C assembly", "Clicking buttons in cloud provider web consoles", "Backing up server hard disks as ISO images",
                                "A", "IaC enables automated, repeatable, and version-controlled provisioning of cloud infrastructure using declarative definitions, eliminating manual configuration drift."),
                        new QuestionSeed("What is the primary objective of Chaos Engineering (e.g., Chaos Monkey)?",
                                "Proactively injecting simulated failures (node crashes, network latency, disk exhaustion) into production to uncover resilience weaknesses", "Randomly generating test data for unit tests", "Testing unauthorized pen-testing attacks on firewalls", "Scrambling git commit messages to test code reviews",
                                "A", "Chaos engineering experiments on a system to build confidence in the system's capability to withstand turbulent conditions in production."),
                        new QuestionSeed("What are the Three Pillars of Observability in modern distributed systems?",
                                "Metrics, Logs, and Distributed Traces", "Security, Privacy, and Compliance", "Unit tests, Integration tests, and End-to-end tests", "Frontend, Backend, and Database",
                                "A", "Metrics (aggregations over time), Logs (discrete timestamped events), and Traces (end-to-end request journeys across services) form the three observability pillars."),
                        new QuestionSeed("In distributed tracing (OpenTelemetry), what is a 'Span'?",
                                "A single contiguous unit of work or operation within a trace, containing name, start/end timestamps, and attributes", "The physical network distance between two data centers", "The lifetime of a virtual machine instance", "A database connection pool timeout",
                                "A", "A trace represents the entire end-to-end request flow, composed of a tree of Spans representing individual operations within services with precise timing and metadata."),
                        new QuestionSeed("What is GitOps in modern cloud-native deployment practices?",
                                "Using Git repositories as the single source of truth for declarative infrastructure and application state, synchronized automatically by an agent (e.g., ArgoCD)", "Running Git commands directly from production bash terminals", "Storing database records in Git commit messages", "Developing applications without local development environments",
                                "A", "In GitOps, the desired system state is stored declaratively in Git; automated reconciliation operators continuously pull and apply changes to match actual cluster state."),
                        new QuestionSeed("What does an Error Budget represent in Site Reliability Engineering (SRE)?",
                                "The allowable threshold of unreliability (100% minus SLO) that teams can burn on rapid feature deployment and experiments", "The financial cost allocated for paying bug bounties", "The maximum number of compilation errors allowed per build", "The penalty fees incurred for cloud API rate limits",
                                "A", "An error budget (derived from Service Level Objectives, e.g., 99.9% uptime allows 0.1% downtime) balances product velocity with service reliability."),
                        new QuestionSeed("What is Cyclomatic Complexity in software metrics?",
                                "A quantitative measure of the number of linearly independent paths through a program's source code, calculated as E - N + 2P", "The time complexity of sorting algorithms in Big-O notation", "The number of nested loops in a method", "The physical memory consumed by an object graph",
                                "A", "Cyclomatic complexity measures code complexity based on decision points (if, while, case), indicating how difficult a method is to test and maintain."),
                        new QuestionSeed("What is the purpose of Static Application Security Testing (SAST) in CI pipelines?",
                                "Analyzing source code for security vulnerabilities, secrets, and CWE violations without executing the program", "Simulating distributed denial of service (DDoS) attacks against staging", "Testing user passwords against dictionary attack lists", "Monitoring network packet flow in production firewalls",
                                "A", "SAST scans uncompiled or compiled source code for known security patterns, injection vulnerabilities, and hardcoded credentials early in the development lifecycle."),
                        new QuestionSeed("What is a Zero-Downtime Database Migration strategy (Expand and Contract pattern)?",
                                "First expand schema with new nullable/parallel columns, update code to dual-write and read from new, backfill data, and contract by dropping old columns", "Shutting down the database at 2 AM on Sunday for 4 hours", "Exporting MySQL data to CSV and importing into Postgres", "Disabling foreign keys permanently in production",
                                "A", "The Expand and Contract pattern breaks breaking schema changes into backward-compatible phases, allowing application code and database schema to evolve with zero user downtime.")
                }
        );
    }
}
