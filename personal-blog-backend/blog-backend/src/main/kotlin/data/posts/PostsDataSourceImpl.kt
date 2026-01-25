package org.example.data.posts

import com.mongodb.client.model.Filters
import com.mongodb.kotlin.client.coroutine.MongoDatabase
import kotlinx.coroutines.flow.firstOrNull
import kotlinx.coroutines.flow.toList
import org.example.data.posts.model.DatabasePost

private const val COLLECTION_NAME = "Posts"

class PostsDataSourceImpl(
    database: MongoDatabase
) : PostsDataSource {
    private val collection = database.getCollection<DatabasePost>(COLLECTION_NAME)

    override suspend fun getPostsList(
        type: String?,
        page: Int?,
        pageSize: Int,
    ): List<DatabasePost> {
        return try {
            val mongoCollection = (type?.let {
                collection
                    .find(Filters.eq("type", it))
            } ?: collection.find())

            page?.let {
                mongoCollection
            } ?: run {
                mongoCollection
            }.toList()

            val mongoList = (type?.let {
                collection
                    .find(Filters.eq("type", it))
            } ?: collection.find()).toList()

            mongoList
        } catch (_: Exception) {
            emptyList()
        }
    }

    override suspend fun getPost(id: Int): DatabasePost? {
        return try {
            collection
                .find(Filters.eq("_id", id))
                .firstOrNull()
        } catch (e: Exception) {
            throw e
        }
    }
}