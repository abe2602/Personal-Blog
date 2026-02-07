package org.example.model

import kotlinx.serialization.Serializable
import org.example.domain.model.Post

@Serializable
data class PostsListResult(
    val postsListing: List<Post>
)
