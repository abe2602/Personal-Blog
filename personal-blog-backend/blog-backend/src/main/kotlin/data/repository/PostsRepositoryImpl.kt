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
    override suspend fun getPostsList(
        type: PostType?,
        page: Int?,
        pageSize: Int,
    ): List<Post> {
        val databaseType = type?.toDatabaseType()

        return dataSource.getPostsList(
            type = databaseType, pageSize = pageSize,
            page = page
        ).map { it.toDomain() }
    }

    override suspend fun getPostById(id: Int): Post? {
        return dataSource.getPost(id)?.toDomain()
    }
}