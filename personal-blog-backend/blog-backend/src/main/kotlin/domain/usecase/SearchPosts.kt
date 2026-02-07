package org.example.domain.usecase

import kotlinx.coroutines.runBlocking
import org.example.domain.model.Post
import org.example.domain.repository.PostsRepository

class SearchPosts(
    private val repository: PostsRepository
) {
    operator fun invoke(query: String): List<Post> = runBlocking {
        repository.searchPosts(query)
    }
}
