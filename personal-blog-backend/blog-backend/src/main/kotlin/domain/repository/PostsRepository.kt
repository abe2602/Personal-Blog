package org.example.domain.repository

import org.example.domain.model.Post
import org.example.domain.model.PostType
import org.example.model.PostsListResult
import org.example.model.PostsListing

interface PostsRepository {
    suspend fun getPostsList(
        type: PostType?,
        page: Int?,
        pageSize: Int,
        title: String? = null,
    ): PostsListing

    suspend fun getPostById(id: Int): Post?
}
