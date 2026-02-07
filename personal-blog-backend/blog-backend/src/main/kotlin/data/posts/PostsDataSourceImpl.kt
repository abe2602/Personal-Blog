package org.example.data.posts

import com.mongodb.client.model.Filters
import com.mongodb.kotlin.client.coroutine.MongoDatabase
import kotlinx.coroutines.flow.firstOrNull
import kotlinx.coroutines.flow.toList
import org.bson.conversions.Bson
import org.example.data.posts.model.DatabasePost
import kotlin.text.Regex

private const val COLLECTION_NAME = "Posts"

class PostsDataSourceImpl(
    database: MongoDatabase
) : PostsDataSource {
    private val collection = database.getCollection<DatabasePost>(COLLECTION_NAME)

    override suspend fun getPostsList(
        type: String?,
        page: Int?,
        pageSize: Int,
        title: String?,
    ): List<DatabasePost> {
        return try {
            val filter = buildListFilter(type = type, title = title)
            val query = collection.find(filter)

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

    override suspend fun countPosts(type: String?, title: String?): Int {
        return try {
            val filter = buildListFilter(type = type, title = title)
            collection.countDocuments(filter).toInt()
        } catch (e: Exception) {
            e.printStackTrace()
            0
        }
    }

    private fun buildListFilter(type: String?, title: String?): Bson {
        val filters = mutableListOf<Bson>()
        type?.let { filters.add(Filters.eq("type", it)) }
        title?.let {
            val pattern = ".*${Regex.escape(it)}.*"
            filters.add(Filters.regex("title", pattern, "i"))
        }
        return if (filters.isEmpty()) org.bson.BsonDocument() else Filters.and(filters)
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