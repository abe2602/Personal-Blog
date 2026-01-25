package org.example.data.posts

import org.example.data.posts.model.DatabasePost
import org.example.domain.model.Post
import org.example.domain.model.PostType

fun DatabasePost.toDomain(): Post {
    return Post(
        id = id,
        userId = userId,
        title = title,
        body = body,
        imageUrl = imageUrl,
        type = type.toDomain(),
        recommendedPosts = emptyList() // come back here later
    )
}

fun PostType.toDatabaseType(): String {
    return when (this) {
        PostType.THOUGHTS -> "THOUGHTS"
        PostType.FAVORITE_CONTENT -> "FAVORITE_CONTENT"
        PostType.MEDIA -> "MEDIA"
    }
}

fun String.toDomain(): PostType {
    return when (this) {
        "THOUGHTS" -> PostType.THOUGHTS
        "FAVORITE_CONTENT" -> PostType.FAVORITE_CONTENT
        else -> PostType.MEDIA
    }
}
