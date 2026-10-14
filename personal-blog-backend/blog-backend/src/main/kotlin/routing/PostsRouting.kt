package org.example.routing

import io.ktor.http.HttpStatusCode
import io.ktor.server.request.receive
import io.ktor.server.response.respond
import io.ktor.server.routing.Route
import io.ktor.server.routing.delete
import io.ktor.server.routing.get
import io.ktor.server.routing.patch
import io.ktor.server.routing.post
import org.example.di.injection
import org.example.domain.model.Post
import org.example.domain.model.PostType
import org.example.domain.usecase.EditPost
import org.example.domain.usecase.GetPost
import org.example.domain.usecase.GetPostsList
import org.example.domain.usecase.RemovePost
import org.example.domain.usecase.SavePost
import kotlin.text.toIntOrNull

fun Route.getPostsRouting() {
    val getPostsList by injection<GetPostsList>()
    val getPost by injection<GetPost>()
    val savePost by injection<SavePost>()
    val removePost by injection<RemovePost>()
    val editPost by injection<EditPost>()

    get("/posts") {
        val pageSize = call.parameters["limit"]?.toIntOrNull() ?: 20
        val page = call.parameters["page"]?.toIntOrNull()
        val title = call.parameters["searchQuery"]?.trim()?.takeIf { it.isNotBlank() }
        val result = getPostsList(pageSize = pageSize, page = page, title = title)

        call.respond(result)
    }

    post("/post") {
        val post = call.receive<Post>()
        val saved = savePost(post)
        call.respond(HttpStatusCode.Created, saved)
    }

    delete("/post/{id}") {
        val id = call.parameters["id"]?.toIntOrNull()
        if (id == null) {
            call.respond(HttpStatusCode.BadRequest, "Invalid post ID")
            return@delete
        }
        if (removePost(id)) {
            call.respond(HttpStatusCode.NoContent)
        } else {
            call.respond(HttpStatusCode.NotFound, "Post not found")
        }
    }

    patch("/post") {
        val post = call.receive<Post>()
        editPost(post)?.let { updated ->
            call.respond(updated)
        } ?: call.respond(HttpStatusCode.NotFound, "Post not found")
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