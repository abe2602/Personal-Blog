package org.example.routing

import io.ktor.http.HttpStatusCode
import io.ktor.server.response.respond
import io.ktor.server.routing.Route
import io.ktor.server.routing.get
import org.example.di.injection
import org.example.domain.model.PostType
import org.example.domain.usecase.GetPost
import org.example.domain.usecase.GetPostsList
import org.koin.ktor.ext.inject
import kotlin.text.toIntOrNull

fun Route.getPostsRouting() {
    val getPostsList by injection<GetPostsList>()
    val getPost by injection<GetPost>()

    get("/posts") {
        call.respond(getPostsList())
    }

    get("/post/{id}") {
        val id = call.parameters["id"]?.toIntOrNull()

        if (id == null) {
            call.respond(HttpStatusCode.BadRequest, "Invalid post ID")
            return@get
        }

        getPost(id = id) ?.let {
            call.respond(it)
        } ?: run {
            call.respond(HttpStatusCode.NotFound, "Post not found")
        }
    }

    get("/favorites") {
        call.respond(getPostsList(PostType.FAVORITE_CONTENT))
    }

    get("/gallery") {
        call.respond(getPostsList(PostType.MEDIA))
    }

    get("/thoughts") {
        call.respond(getPostsList(PostType.THOUGHTS))
    }
}