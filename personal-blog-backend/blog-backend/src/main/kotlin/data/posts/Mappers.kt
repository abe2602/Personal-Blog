package org.example.data.posts

import org.example.data.posts.model.DatabasePost
import org.example.data.posts.model.DatabasePostType
import org.example.domain.model.Post
import org.example.domain.model.PostType

fun DatabasePost.toDomain(): Post {
    return Post(
        id = id,
        userId = userId,
        title = title,
        body = body,
        imageUrl = imageUrl,
        type = type.toDomainType(),
        recommendedPosts = recommendedPosts.map { it.toDomain() }
    )
}

fun DatabasePostType.toDomainType(): PostType {
    return when (this) {
        DatabasePostType.THOUGHTS -> PostType.THOUGHTS
        DatabasePostType.FAVORITE_CONTENT -> PostType.FAVORITE_CONTENT
        DatabasePostType.MEDIA -> PostType.MEDIA
    }
}

fun PostType.toDatabaseType(): DatabasePostType {
    return when (this) {
        PostType.THOUGHTS -> DatabasePostType.THOUGHTS
        PostType.FAVORITE_CONTENT -> DatabasePostType.FAVORITE_CONTENT
        PostType.MEDIA -> DatabasePostType.MEDIA
    }
}