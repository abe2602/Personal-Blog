package org.example.data.repository

import org.example.data.posts.PostsDataSource
import org.example.domain.model.Post
import org.example.domain.model.PostType
import org.example.domain.repository.PostsRepository
import org.example.data.posts.toDatabaseType
import org.example.data.posts.toDomain

class PostsRepositoryImpl(
    private val dataSource: PostsDataSource
) : PostsRepository {
    override suspend fun getPostsList(type: PostType?): List<Post> {
        val databaseType = type?.toDatabaseType()

        return dataSource.getPostsList(type = databaseType).map { it.toDomain() }
    }

    override suspend fun getPostById(id: Int): Post? {
        return dataSource.getPost(id)?.toDomain()
    }
}