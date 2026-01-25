package org.example.data.posts.model

import org.bson.codecs.pojo.annotations.BsonId
import org.bson.codecs.pojo.annotations.BsonProperty

data class DatabasePost(
    @param:BsonId
    val id: Int,
    @param:BsonProperty("userId")
    val userId: Int,
    val title: String,
    val body: String,
    val imageUrl: String? = null,
    val type: String,
    @param:BsonProperty("recommendedPostIds")
    val recommendedPostIds: List<Int> = emptyList()
)
