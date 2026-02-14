package org.example.data.cache

import org.example.domain.model.PostType

data class PostsListCacheKey(
    val type: PostType?,
    val page: Int?,
    val pageSize: Int,
    val title: String?
)
