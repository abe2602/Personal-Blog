package org.example.data.repository

import org.example.data.posts.PostsDataSource
import org.example.domain.model.Post
import org.example.domain.model.PostType
import org.example.domain.repository.PostsRepository
import org.example.data.posts.toDatabaseType
import org.example.data.posts.toDomain
import org.example.model.PostsListing

class PostsRepositoryImpl(
    private val dataSource: PostsDataSource
) : PostsRepository {
    override suspend fun getPostsList(
        type: PostType?,
        page: Int?,
        pageSize: Int,
    ): PostsListing {
        val databaseType = type?.toDatabaseType()
        val posts = dataSource.getPostsList(
            type = databaseType,
            pageSize = pageSize,
            page = page
        ).map { it.toDomain() }
        val total = countPosts(type = null)

        return PostsListing(postsList = posts, total = total)
    }

    override suspend fun getPostById(id: Int): Post? {
        return dataSource.getPost(id)?.toDomain()
    }

    private suspend fun countPosts(type: PostType?): Int {
        return dataSource.countPosts(type?.toDatabaseType())
    }
}