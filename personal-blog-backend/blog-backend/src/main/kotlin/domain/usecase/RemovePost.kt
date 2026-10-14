package org.example.domain.usecase

import kotlinx.coroutines.runBlocking
import org.example.domain.repository.PostsRepository

class RemovePost(
    private val repository: PostsRepository
) {
    operator fun invoke(id: Int): Boolean = runBlocking {
        repository.deletePost(id)
    }
}
