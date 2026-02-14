package org.example.data.repository

import org.example.data.cache.PostsListCacheKey
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

    private val listCache = ConcurrentHashMap<PostsListCacheKey, PostsListing>()
    private val postCache = ConcurrentHashMap<Int, Post>()

    override suspend fun getPostsList(
        type: PostType?,
        page: Int?,
        pageSize: Int,
        title: String?,
    ): PostsListing {
        val key = PostsListCacheKey(type = type, page = page, pageSize = pageSize, title = title)
        listCache[key]?.let { return it }

        val databaseType = type?.toDatabaseType()
        val posts = dataSource.getPostsList(
            type = databaseType,
            pageSize = pageSize,
            page = page,
            title = title
        ).map { it.toDomain() }
        val total = countPosts(type = type, title = title)
        val result = PostsListing(postsList = posts, total = total)
        listCache[key] = result
        return result
    }

    override suspend fun getPostById(id: Int): Post? {
        postCache[id]?.let { return it }
        val post = dataSource.getPost(id)?.toDomain()
        post?.let { postCache[id] = it }
        return post
    }

    private suspend fun countPosts(type: PostType?, title: String? = null): Int {
        return dataSource.countPosts(type?.toDatabaseType(), title)
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

    private fun invalidateCache() {
        listCache.clear()
        postCache.clear()
    }
}