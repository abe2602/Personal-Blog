package org.example.routing

import io.ktor.http.HttpStatusCode
import io.ktor.server.response.respond
import io.ktor.server.routing.Route
import io.ktor.server.routing.get
import org.example.di.injection
import org.example.domain.model.PostType
import org.example.domain.usecase.GetPost
import org.example.domain.usecase.GetPostsList
import kotlin.text.toIntOrNull

fun Route.getPostsRouting() {
    val getPostsList by injection<GetPostsList>()
    val getPost by injection<GetPost>()

    get("/posts") {
        val pageSize = call.parameters["limit"]?.toIntOrNull() ?: 20
        val page = call.parameters["page"]?.toIntOrNull()
        val title = call.parameters["searchQuery"]?.trim()?.takeIf { it.isNotBlank() }
        val result = getPostsList(pageSize = pageSize, page = page, title = title)

        call.respond(result)
    }

    get("/post/{id}") {
        val id = call.parameters["id"]?.toIntOrNull()

        if (id == null) {
            call.respond(HttpStatusCode.BadRequest, "Invalid post ID")
            return@get
        }

        getPost(id = id)?.let {
            call.respond(it)
        } ?: run {
            call.respond(HttpStatusCode.NotFound, "Post not found")
        }
    }

    get("/favorites") {
        val pageSize = call.parameters["limit"]?.toIntOrNull() ?: 20
        val page = call.parameters["page"]?.toIntOrNull()
        val result = getPostsList(
            type = PostType.FAVORITE_CONTENT,
            pageSize = pageSize,
            page = page
        )

        call.respond(result)
    }

    get("/gallery") {
        val pageSize = call.parameters["limit"]?.toIntOrNull() ?: 20
        val page = call.parameters["page"]?.toIntOrNull()
        val result = getPostsList(
            type = PostType.MEDIA,
            pageSize = pageSize,
            page = page
        )

        call.respond(result)
    }

    get("/thoughts") {
        val pageSize = call.parameters["limit"]?.toIntOrNull() ?: 20
        val page = call.parameters["page"]?.toIntOrNull()
        val result = getPostsList(
            type = PostType.THOUGHTS,
            pageSize = pageSize,
            page = page
        )

        call.respond(result)
    }
}