package org.example.data.repository

import org.example.data.posts.PostsDataSource
import org.example.data.posts.toDatabase
import org.example.domain.model.Post
import org.example.domain.model.PostType
import org.example.domain.repository.PostsRepository
import org.example.data.posts.toDatabaseType
import org.example.data.posts.toDomain
import org.example.model.PostsListing
import java.util.concurrent.ConcurrentHashMap

class PostsRepositoryImpl(
    private val dataSource: PostsDataSource
) : PostsRepository {

    private val postCache = ConcurrentHashMap<Int, Post>()

    override suspend fun getPostsList(
        type: PostType?,
        page: Int?,
        pageSize: Int,
        title: String?,
    ): PostsListing {
        val databaseType = type?.toDatabaseType()
        val posts = dataSource.getPostsList(
            type = databaseType,
            pageSize = pageSize,
            page = page,
            title = title
        ).map { it.toDomain() }
        val total = dataSource.countPosts(type = databaseType, title = title)
        return PostsListing(postsList = posts, total = total)
    }

    override suspend fun getPostById(id: Int): Post? {
        postCache[id]?.let { return it }
        val post = dataSource.getPost(id)?.toDomain()
        post?.let { postCache[id] = it }
        return post
    }

    override suspend fun savePost(post: Post): Post {
        val nextId = dataSource.getNextId()
        val recommendedPosts = dataSource.getRandomPosts(limit = 10)
        val databasePost = post.toDatabase(
            id = nextId,
            recommendedPosts = recommendedPosts
        )
        dataSource.savePost(databasePost)
        invalidateCache()
        return databasePost.toDomain()
    }

    override suspend fun deletePost(id: Int): Boolean {
        val deleted = dataSource.deletePost(id)
        if (deleted) postCache.remove(id)
        return deleted
    }

    override suspend fun updatePost(post: Post): Post? {
        val databasePost = post.toDatabase(
            id = post.id,
            recommendedPosts = post.recommendedPosts.map { it.toDatabase(it.id, emptyList()) }
        )
        val updated = dataSource.updatePost(databasePost)
        if (updated) {
            postCache.remove(post.id)
            return dataSource.getPost(post.id)?.toDomain()
        }
        return null
    }

    private fun invalidateCache() {
        postCache.clear()
    }
}