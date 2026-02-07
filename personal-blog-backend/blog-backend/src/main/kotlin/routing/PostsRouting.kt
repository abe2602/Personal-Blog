package org.example.routing

import io.ktor.http.HttpStatusCode
import io.ktor.server.response.respond
import io.ktor.server.routing.Route
import io.ktor.server.routing.get
import org.example.di.injection
import org.example.domain.model.PostType
import org.example.domain.usecase.GetPost
import org.example.domain.usecase.GetPostsList
import org.example.domain.usecase.SearchPosts
import kotlin.text.toIntOrNull

fun Route.getPostsRouting() {
    val getPostsList by injection<GetPostsList>()
    val getPost by injection<GetPost>()
    val searchPosts by injection<SearchPosts>()

    get("/posts/search") {
        val query = call.parameters["searchQuery"]?.trim()
        if (query.isNullOrBlank()) {
            call.respond(HttpStatusCode.BadRequest, "Search query 'q' is required")
            return@get
        }
        val result = searchPosts(query = query)
        call.respond(result)
    }

    get("/posts") {
        val pageSize = call.parameters["limit"]?.toIntOrNull() ?: 20
        val page = call.parameters["page"]?.toIntOrNull()
        val result = getPostsList(pageSize = pageSize, page = page)

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