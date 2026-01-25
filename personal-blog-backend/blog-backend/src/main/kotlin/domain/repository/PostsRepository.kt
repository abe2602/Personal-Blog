package org.example.domain.repository

import org.example.domain.model.Post
import org.example.domain.model.PostType

interface PostsRepository {
    suspend fun getPostsList(
        type: PostType?,
        page: Int?,
        pageSize: Int,
    ): List<Post>

    suspend fun getPostById(id: Int): Post?
}