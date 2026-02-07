package org.example.domain.usecase

import kotlinx.coroutines.runBlocking
import org.example.domain.model.PostType
import org.example.domain.repository.PostsRepository
import org.example.model.PostsListing

class GetPostsList(
    private val repository: PostsRepository
) {
    operator fun invoke(
        type: PostType? = null,
        page: Int?,
        pageSize: Int
    ): PostsListing = runBlocking {
        repository.getPostsList(type = type, page = page, pageSize = pageSize)
    }
}