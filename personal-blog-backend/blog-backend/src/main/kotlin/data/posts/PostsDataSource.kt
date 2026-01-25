package org.example.data.posts

import org.example.data.posts.model.DatabasePost
import org.example.domain.model.PostType

interface PostsDataSource {
    suspend fun getPostsList(
        type: String?,
        page: Int?,
        pageSize: Int,
    ): List<DatabasePost>

    suspend fun getPost(id: Int): DatabasePost?
}