package org.example.data.posts

import org.example.data.posts.model.DatabasePost
import org.example.domain.model.PostType

interface PostsDataSource {
    suspend fun getPostsList(
        type: String?,
        page: Int?,
        pageSize: Int,
        title: String? = null,
    ): List<DatabasePost>

    suspend fun countPosts(type: String?, title: String? = null): Int

    suspend fun getPost(id: Int): DatabasePost?
}