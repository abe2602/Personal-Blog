package org.example.domain.model

import kotlinx.serialization.Serializable

@Serializable
data class Profile(val title: String, val description: String, val imageUrl: String?)