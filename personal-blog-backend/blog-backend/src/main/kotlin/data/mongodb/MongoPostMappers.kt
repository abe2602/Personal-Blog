package org.example.data.mongodb

import org.example.data.posts.model.DatabasePost
import org.example.data.posts.model.DatabasePostType

fun MongoPostDocument.toDatabasePost(): DatabasePost {
    return DatabasePost(
        id = id,
        userId = userId,
        title = title,
        body = body,
        imageUrl = imageUrl,
        type = type.toDatabasePostType(),
        recommendedPosts = emptyList() // Will be populated separately if needed
    )
}

fun String.toDatabasePostType(): DatabasePostType {
    return when (this) {
        "THOUGHTS" -> DatabasePostType.THOUGHTS
        "FAVORITE_CONTENT" -> DatabasePostType.FAVORITE_CONTENT
        "MEDIA" -> DatabasePostType.MEDIA
        else -> throw IllegalArgumentException("Unknown post type: $this")
    }
}
