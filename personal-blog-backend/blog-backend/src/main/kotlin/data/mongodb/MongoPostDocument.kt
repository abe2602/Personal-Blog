package org.example.data.mongodb

import org.bson.codecs.pojo.annotations.BsonId
import org.bson.codecs.pojo.annotations.BsonProperty

data class MongoPostDocument(
    @BsonId
    val id: Int,
    @BsonProperty("userId")
    val userId: Int,
    val title: String,
    val body: String,
    val imageUrl: String? = null,
    val type: String,
    @BsonProperty("recommendedPostIds")
    val recommendedPostIds: List<Int> = emptyList()
)
