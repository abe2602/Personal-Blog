package org.example.data.posts

import org.example.data.posts.model.DatabasePost
import org.example.data.posts.model.DatabasePostType

interface PostsDataSource {
    suspend fun getPostsList(type: DatabasePostType?): List<DatabasePost>
    suspend fun getPost(id: Int): List<DatabasePost>
}