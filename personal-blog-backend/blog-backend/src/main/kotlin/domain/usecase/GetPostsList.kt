package org.example.domain.usecase

import kotlinx.coroutines.runBlocking
import org.example.domain.model.PostType
import org.example.domain.repository.PostsRepository

class GetPostsList(
    private val repository: PostsRepository
) {
    operator fun invoke(type: PostType? = null) = runBlocking {
        repository.getPostsList(type)
    }
}