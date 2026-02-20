package org.example

import io.ktor.http.HttpStatusCode
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.server.plugins.cors.routing.*
import io.ktor.server.plugins.statuspages.*
import io.ktor.server.response.respond
import io.ktor.server.routing.*
import kotlinx.serialization.json.Json
import org.example.data.di.dataModule
import org.example.di.appModule
import org.example.routing.getPostsRouting
import org.example.routing.getProfileRouting
import org.koin.ktor.plugin.Koin
import org.koin.logger.slf4jLogger
import org.slf4j.LoggerFactory


private val log = LoggerFactory.getLogger("Application")

fun main() {
    val port = System.getenv("PORT")?.toIntOrNull() ?: 8080
    logMongoEnv()
    embeddedServer(Netty, port = port, host = "0.0.0.0") {
        configureCors()
        configureStatusPages()
        configureKoin()
        configureRouting()
    }.start(wait = true)
}

private fun Application.configureCors() {
    install(CORS) {
        allowMethod(io.ktor.http.HttpMethod.Get)
        allowMethod(io.ktor.http.HttpMethod.Post)
        allowMethod(io.ktor.http.HttpMethod.Put)
        allowMethod(io.ktor.http.HttpMethod.Delete)
        allowMethod(io.ktor.http.HttpMethod.Options)
        allowHeader(io.ktor.http.HttpHeaders.ContentType)
        allowHeader(io.ktor.http.HttpHeaders.Authorization)
        // Local dev
        allowHost("localhost:5173", schemes = listOf("http"))
        allowHost("127.0.0.1:5173", schemes = listOf("http"))
        // Production: set CORS_ORIGINS env on Railway (e.g. "https://myblog.com" or "https://myblog.com,https://www.myblog.com")
        System.getenv("CORS_ORIGINS")?.split(",")?.forEach { origin ->
            val trimmed = origin.trim().takeIf { it.isNotBlank() } ?: return@forEach
            val host = trimmed.removePrefix("http://").removePrefix("https://")
            val schemes = if (trimmed.startsWith("https")) listOf("https") else listOf("http", "https")
            allowHost(host, schemes = schemes)
        }
    }
}

private fun logMongoEnv() {
    val uri = System.getenv("MONGODB_URI")
    val db = System.getenv("MONGODB_DATABASE")
    when {
        uri.isNullOrBlank() -> log.warn("MONGODB_URI is not set - database routes will fail with 500")
        db.isNullOrBlank() -> log.warn("MONGODB_DATABASE is not set - database routes will fail with 500")
        else -> log.info("MongoDB env configured (database: $db)")
    }
}

private fun Application.configureStatusPages() {
    install(StatusPages) {
        exception<Throwable> { call, cause ->
            call.respond(HttpStatusCode.InternalServerError, mapOf(
                "error" to "Internal Server Error",
                "message" to (cause.message ?: "Unknown error")
            ))
        }
    }
}

fun Application.configureKoin() {
    install(Koin) {
        slf4jLogger()
        modules(dataModule, appModule)
    }
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
        getPostsRouting()
        getProfileRouting()
    }
}


