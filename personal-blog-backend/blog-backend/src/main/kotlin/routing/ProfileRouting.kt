package org.example.routing

import io.ktor.server.response.respond
import io.ktor.server.routing.Route
import io.ktor.server.routing.get
import org.example.domain.model.Profile

fun Route.getProfileRouting() {
    get("/profile") {
        val profile = Profile(
            title = "Bem-vindo ao Abecaxis!",
            description = "Não sei o que você estava procurando, mas espero que encontre aqui. \n Prazer, pode me chamar de Abe :)",
            imageUrl = "https://i.imgur.com/5ZOt5xN.jpeg"
        )

        call.respond(profile)
    }
}