package org.example.domain.repository

import org.example.domain.model.Post
import org.example.domain.model.PostType

interface PostsRepository {
    suspend fun getAllPosts(): List<Post>
    suspend fun getPostById(id: Int): Post?
    suspend fun getPostsByType(type: PostType): List<Post>
}