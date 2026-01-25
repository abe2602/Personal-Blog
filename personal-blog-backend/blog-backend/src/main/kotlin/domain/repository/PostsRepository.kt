package org.example.domain.repository

import org.example.domain.model.Post
import org.example.domain.model.PostType

interface PostsRepository {
    suspend fun getPostsList(type: PostType?): List<Post>
    suspend fun getPostById(id: Int): Post?
}