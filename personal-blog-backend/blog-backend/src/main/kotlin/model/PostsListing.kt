package org.example.model

import kotlinx.serialization.Serializable
import org.example.domain.model.Post

@Serializable
data class PostsListing(
    val postsList: List<Post>,
    val total: Int
)
