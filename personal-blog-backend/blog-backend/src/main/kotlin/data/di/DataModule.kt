package org.example.data.di

import com.mongodb.kotlin.client.coroutine.MongoClient
import com.mongodb.kotlin.client.coroutine.MongoDatabase
import org.example.data.posts.PostsDataSource
import org.example.data.posts.PostsDataSourceImpl
import org.example.data.repository.PostsRepositoryImpl
import org.example.domain.repository.PostsRepository
import org.koin.dsl.module

val dataModule = module {
    single<MongoClient> {
        val connectionString = System.getenv("MONGODB_URI").orEmpty()
        MongoClient.create(connectionString)
    }

    single<MongoDatabase> {
        val databaseName = System.getenv("MONGODB_DATABASE").orEmpty()
        get<MongoClient>().getDatabase(databaseName)
    }

    single<PostsDataSource> {
        PostsDataSourceImpl(database = get<MongoDatabase>())
    }

    single<PostsRepository> { 
        PostsRepositoryImpl(dataSource = get<PostsDataSource>())
    }
}