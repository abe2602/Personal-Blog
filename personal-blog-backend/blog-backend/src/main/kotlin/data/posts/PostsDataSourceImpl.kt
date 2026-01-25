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
    private val postsList = mutableListOf<DatabasePost>()

    override suspend fun getPostsList(type: DatabasePostType?): List<DatabasePost> {
        return try {
            if (postsList.isEmpty()) {
                val mongoList = collection.find().toList().map { it.toDatabasePost() }
                postsList.addAll(mongoList)
            }

            postsList
        } catch (_: Exception) {
            emptyList()
        }
    }

    override suspend fun getPost(id: Int): List<DatabasePost> {
        return try {
            val document = collection.find(Filters.eq("_id", id)).firstOrNull()
            if (document != null) {
                listOf(document.toDatabasePost())
            } else {
                emptyList()
            }
        } catch (e: Exception) {
            throw e
        }
    }
}