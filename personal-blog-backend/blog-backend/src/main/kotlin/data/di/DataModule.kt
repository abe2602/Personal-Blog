package org.example.data.di

import org.example.data.posts.PostsDataSource
import org.example.data.posts.PostsDataSourceImpl
import org.example.data.repository.PostsRepositoryImpl
import org.example.domain.repository.PostsRepository
import org.koin.dsl.module

val dataModule = module {
    single<PostsDataSource> { PostsDataSourceImpl() }
    single<PostsRepository> { PostsRepositoryImpl(dataSource = get()) }
}