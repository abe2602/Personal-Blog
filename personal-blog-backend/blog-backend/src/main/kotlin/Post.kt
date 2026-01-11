package org.example

import kotlinx.serialization.Serializable

@Serializable
enum class PostType {
    THOUGHTS,
    FAVORITE_CONTENT,
    MEDIA
}

@Serializable
data class Post(
    val id: Int,
    val userId: Int,
    val title: String,
    val body: String,
    val imageUrl: String? = null,
    val type: PostType
)

