package org.example

import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.serialization.json.Json

fun main() {
    embeddedServer(Netty, port = 8080, host = "0.0.0.0") {
        configureRouting()
    }.start(wait = true)
}

fun Application.configureRouting() {
    install(ContentNegotiation) {
        json(Json {
            prettyPrint = true
            isLenient = true
            ignoreUnknownKeys = true
        })
    }
    
    routing {
        getPostsList()
    }
}

fun Route.getPostsList() {
    get("/posts") {
        val posts = listOf(
            Post(
                id = 1,
                userId = 101,
                title = "Getting Started with Kotlin Development",
                body = "Kotlin has become one of the most popular programming languages for modern application development. In this comprehensive guide, we'll explore the fundamentals of Kotlin, its key features, and why it's an excellent choice for both backend and Android development. We'll cover everything from basic syntax to advanced concepts like coroutines and sealed classes. Whether you're a beginner or an experienced developer looking to expand your skillset, this post will provide you with a solid foundation to start building robust applications with Kotlin.",
                image = "https://example.com/images/kotlin-intro.jpg"
            ),
            Post(
                id = 2,
                userId = 102,
                title = "Building RESTful APIs with Ktor",
                body = "Ktor is a powerful and lightweight framework for building asynchronous servers and clients in Kotlin. In this detailed tutorial, we'll walk through creating a complete RESTful API from scratch. We'll cover routing, content negotiation, serialization, error handling, and best practices for API design. You'll learn how to structure your application, handle different HTTP methods, implement authentication, and test your endpoints. By the end of this guide, you'll have the knowledge to build production-ready APIs that are both performant and maintainable.",
                image = "https://example.com/images/ktor-api.jpg"
            ),
            Post(
                id = 3,
                userId = 101,
                title = "Understanding Coroutines in Kotlin",
                body = "Coroutines are one of Kotlin's most powerful features for handling asynchronous programming. They provide a way to write asynchronous code that looks and feels like synchronous code, making it easier to understand and maintain. In this deep dive, we'll explore how coroutines work under the hood, the difference between suspend functions and regular functions, and how to properly manage coroutine scopes and contexts. We'll also discuss common patterns, error handling strategies, and performance considerations. This knowledge is essential for building responsive and efficient Kotlin applications.",
                image = "https://example.com/images/coroutines.jpg"
            ),
            Post(
                id = 4,
                userId = 103,
                title = "Database Integration with Exposed ORM",
                body = "Exposed is a lightweight SQL library written in Kotlin that provides both a typesafe DSL and lightweight data access objects for your database operations. In this comprehensive guide, we'll explore how to set up Exposed in your Kotlin project, define your database schema, perform CRUD operations, handle relationships between tables, and implement transactions. We'll also cover advanced topics like migrations, connection pooling, and query optimization. Whether you're working with PostgreSQL, MySQL, or SQLite, this guide will help you build robust data access layers for your applications.",
                image = "https://example.com/images/exposed-orm.jpg"
            ),
            Post(
                id = 5,
                userId = 102,
                title = "Testing Strategies for Kotlin Applications",
                body = "Writing effective tests is crucial for maintaining code quality and ensuring your application works as expected. In this article, we'll explore various testing strategies specifically tailored for Kotlin applications. We'll cover unit testing with JUnit and MockK, integration testing for your Ktor applications, property-based testing, and testing coroutines. You'll learn about test organization, mocking strategies, test data builders, and how to write tests that are both comprehensive and maintainable. We'll also discuss test coverage metrics and when to use different types of tests.",
                image = "https://example.com/images/testing.jpg"
            ),
            Post(
                id = 6,
                userId = 101,
                title = "Deploying Kotlin Applications to Production",
                body = "Taking your Kotlin application from development to production requires careful planning and execution. This guide covers everything you need to know about deploying Kotlin applications, including containerization with Docker, setting up CI/CD pipelines, monitoring and logging strategies, and performance optimization. We'll discuss different deployment platforms, environment configuration management, health checks, graceful shutdowns, and scaling strategies. You'll also learn about common pitfalls to avoid and best practices for maintaining applications in production environments.",
                image = "https://example.com/images/deployment.jpg"
            ),
            Post(
                id = 7,
                userId = 104,
                title = "Advanced Kotlin Features You Should Know",
                body = "Kotlin offers many advanced features that can make your code more expressive, safe, and concise. In this exploration, we'll dive into sealed classes and sealed interfaces, inline classes, type-safe builders, delegation patterns, and reified generics. We'll also cover extension functions and properties, infix functions, operator overloading, and destructuring declarations. Each feature will be explained with practical examples showing when and how to use them effectively. Understanding these advanced features will help you write more idiomatic Kotlin code and leverage the full power of the language.",
                image = "https://example.com/images/advanced-kotlin.jpg"
            ),
            Post(
                id = 8,
                userId = 103,
                title = "Building Microservices with Kotlin",
                body = "Microservices architecture has become the standard for building scalable and maintainable applications. In this comprehensive guide, we'll explore how to build microservices using Kotlin and Ktor. We'll cover service discovery, API gateways, inter-service communication patterns, distributed tracing, and handling distributed transactions. You'll learn about design patterns specific to microservices, how to handle failures gracefully, implement circuit breakers, and manage configuration across multiple services. We'll also discuss deployment strategies, monitoring, and debugging techniques for distributed systems.",
                image = "https://example.com/images/microservices.jpg"
            ),
            Post(
                id = 9,
                userId = 102,
                title = "Security Best Practices for Kotlin Backend Applications",
                body = "Security is paramount when building backend applications that handle sensitive data. This article covers essential security practices for Kotlin applications, including authentication and authorization strategies, input validation and sanitization, SQL injection prevention, XSS protection, and secure password handling. We'll discuss OAuth2 and JWT implementation, rate limiting, CORS configuration, and security headers. You'll also learn about common vulnerabilities and how to protect against them, security testing approaches, and compliance considerations. Following these practices will help you build secure applications that protect both your users and your business.",
                image = "https://example.com/images/security.jpg"
            ),
            Post(
                id = 10,
                userId = 101,
                title = "Performance Optimization Techniques in Kotlin",
                body = "Performance is a critical aspect of any application, and Kotlin provides many tools and techniques to help you write efficient code. In this detailed guide, we'll explore various optimization strategies including lazy initialization, collection operations optimization, memory management, and profiling techniques. We'll discuss when to use sequences vs collections, how to optimize coroutine usage, caching strategies, and database query optimization. You'll learn about performance measurement tools, how to identify bottlenecks, and techniques for improving both CPU and memory usage. We'll also cover JVM-specific optimizations and how to write code that performs well under load.",
                image = "https://example.com/images/performance.jpg"
            ),
            Post(
                id = 11,
                userId = 104,
                title = "Error Handling and Resilience Patterns",
                body = "Building resilient applications requires thoughtful error handling strategies. In this article, we'll explore different approaches to error handling in Kotlin, including the use of Result types, sealed classes for error modeling, and exception handling best practices. We'll discuss retry mechanisms, circuit breakers, bulkheads, and timeout patterns. You'll learn how to implement graceful degradation, handle partial failures, and provide meaningful error messages to clients. We'll also cover logging strategies for errors, monitoring and alerting, and how to test error scenarios. These patterns will help you build applications that can handle failures gracefully and maintain availability even when things go wrong.",
                image = "https://example.com/images/resilience.jpg"
            ),
            Post(
                id = 12,
                userId = 103,
                title = "Modern Kotlin Development Workflow",
                body = "A well-structured development workflow can significantly improve productivity and code quality. This guide covers modern development practices for Kotlin projects, including project structure, build configuration with Gradle, dependency management, code formatting and linting, Git workflows, and code review practices. We'll discuss IDE setup and productivity tips, debugging techniques, and how to set up effective development environments. You'll learn about version control strategies, branching models, and how to maintain clean codebases. We'll also cover documentation practices, API design, and collaboration tools that can enhance your team's development experience.",
                image = "https://example.com/images/workflow.jpg"
            )
        )
        call.respond(posts)
    }
}