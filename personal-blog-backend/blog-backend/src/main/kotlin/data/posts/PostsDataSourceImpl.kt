package org.example.data.posts

import com.mongodb.client.model.Filters
import com.mongodb.kotlin.client.coroutine.MongoDatabase
import kotlinx.coroutines.flow.firstOrNull
import kotlinx.coroutines.flow.toList
import org.example.data.mongodb.MongoPostDocument
import org.example.data.mongodb.toDatabasePost
import org.example.data.posts.model.DatabasePost
import org.example.data.posts.model.DatabasePostType

private const val COLLECTION_NAME = "Posts"

class PostsDataSourceImpl(
    database: MongoDatabase
) : PostsDataSource {
    private val collection = database.getCollection<MongoPostDocument>(COLLECTION_NAME)

    override suspend fun getPostsList(type: DatabasePostType?): List<DatabasePost> {
        return try {
            val mongoList = (type?.let {
                collection.find(Filters.eq("type", it.name))
            } ?: collection.find()).toList()

            mongoList.map { it.toDatabasePost() }
        } catch (_: Exception) {
            emptyList()
        }
    }

    override suspend fun getPost(id: Int): DatabasePost? {
        return try {
            collection
                .find(Filters.eq("_id", id))
                .firstOrNull()
                ?.toDatabasePost()
        } catch (e: Exception) {
            throw e
        }
    }
}