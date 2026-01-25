package org.example.data.posts

import org.example.data.posts.model.DatabasePost

interface PostsDataSource {
    suspend fun getPostsList(type: String?): List<DatabasePost>
    suspend fun getPost(id: Int): DatabasePost?
}