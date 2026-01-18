package org.example.routing

import io.ktor.http.HttpStatusCode
import io.ktor.server.response.respond
import io.ktor.server.routing.Route
import io.ktor.server.routing.get
import org.example.domain.model.PostType
import org.example.posts
import kotlin.text.toIntOrNull

fun Route.getPostsRouting() {
    get("/posts") {
        call.respond(posts)
    }

    get("/post/{id}") {
        val id = call.parameters["id"]?.toIntOrNull()

        if (id == null) {
            call.respond(HttpStatusCode.BadRequest, "Invalid post ID")
            return@get
        }

        return@get posts.firstOrNull { it.id == id } ?.let {
            call.respond(it)
        } ?: run {call.respond(HttpStatusCode.NotFound, "Post not found") }
    }

    get("/favorites") {
        call.respond(posts.filter { it.type == PostType.FAVORITE_CONTENT })
    }

    get("/gallery") {
        call.respond(posts.filter { it.type == PostType.MEDIA })
    }

    get("/thoughts") {
        call.respond(posts.filter { it.type == PostType.THOUGHTS })
    }
}