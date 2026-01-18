package org.example.domain.usecase

import kotlinx.coroutines.runBlocking
import org.example.domain.model.Post
import org.example.domain.repository.PostsRepository

class GetPost(
    private val repository: PostsRepository
) {
    operator fun invoke(id: Int): Post? = runBlocking {
        repository.getPostById(id)
    }
}