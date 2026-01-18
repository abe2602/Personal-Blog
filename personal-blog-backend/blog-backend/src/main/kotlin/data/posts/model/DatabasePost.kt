package org.example.data.posts.model

data class DatabasePost(
    val id: Int,
    val userId: Int,
    val title: String,
    val body: String,
    val imageUrl: String? = null,
    val type: DatabasePostType,
    val recommendedPosts: List<DatabasePost> = emptyList()
)

