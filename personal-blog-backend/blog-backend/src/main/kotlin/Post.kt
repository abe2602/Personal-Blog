package org.example

import kotlinx.serialization.Serializable

@Serializable
data class Post(
    val id: Int,
    val userId: Int,
    val title: String,
    val body: String,
    val image: String? = null
)

