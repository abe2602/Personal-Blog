package org.example.model

import kotlinx.serialization.Serializable
import org.example.domain.model.Post

@Serializable
data class PostPage(
    val posts: List<Post>,
    val page: Int,
    val total: Long,
    val pageSize: Int,
    val totalPages: Long
)