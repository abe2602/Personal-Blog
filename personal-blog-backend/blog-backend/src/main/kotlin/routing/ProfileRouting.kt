package org.example.routing

import io.ktor.server.response.respond
import io.ktor.server.routing.Route
import io.ktor.server.routing.get
import org.example.domain.model.Profile

fun Route.getProfileRouting() {
    get("/profile") {
        val profile = Profile(
            title = "Welcome to My Blog",
            description = "This is a personal blog where I share my thoughts and experiences. Feel free to explore the posts and discover interesting content.",
            imageUrl = "https://d14d9vp3wdof84.cloudfront.net/image/589816272436/image_vtub8q0lmd4gpcd4l9a5e6dl3p/-S897-FWEBP"
        )

        call.respond(profile)
    }
}