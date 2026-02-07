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
            val query = type?.let {
                collection.find(Filters.eq("type", it))
            } ?: collection.find()

            val paginatedQuery = page?.let {
                val skip = (it - 1).coerceAtLeast(0) * pageSize
                query.skip(skip).limit(pageSize)
            } ?: query.limit(pageSize)

            paginatedQuery.toList()
        } catch (e: Exception) {
            e.printStackTrace()
            emptyList()
        }
    }

    override suspend fun countPosts(type: String?): Int {
        return try {
            val filter = type?.let { Filters.eq("type", it) } ?: org.bson.BsonDocument()
            collection.countDocuments(filter).toInt()
        } catch (e: Exception) {
            e.printStackTrace()
            0
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