package org.example.domain.model

import kotlinx.serialization.Serializable

@Serializable
data class Post(
    val id: Int,
    val userId: Int,
    val title: String,
    val body: String,
    val imageUrl: String? = null,
    val type: PostType,
    val creationDate: String = "",
    val recommendedPosts: List<Post> = emptyList()
)

