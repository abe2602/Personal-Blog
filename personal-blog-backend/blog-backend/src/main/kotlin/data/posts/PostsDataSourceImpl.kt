package org.example.data.posts

import org.example.data.posts.model.DatabasePost
import org.example.data.posts.model.DatabasePostType

class PostsDataSourceImpl: PostsDataSource {
    override suspend fun getPostsList(type: DatabasePostType?): List<DatabasePost> {
        return if (type == null) {
            posts
        } else {
            posts.filter { it.type == type }
        }
    }

    override suspend fun getPost(id: Int): List<DatabasePost> {
        return posts.filter { it.id == id }
    }
}