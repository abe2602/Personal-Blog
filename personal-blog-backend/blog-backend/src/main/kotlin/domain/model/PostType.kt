package org.example.domain.model

import kotlinx.serialization.Serializable

@Serializable
enum class PostType {
    THOUGHTS,
    FAVORITE_CONTENT,
    MEDIA
}