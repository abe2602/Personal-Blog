package org.example.di

import org.example.domain.usecase.GetPost
import org.example.domain.usecase.GetPostsList
import org.koin.dsl.module

val appModule = module {
    factory { GetPost(repository = get()) }
    factory { GetPostsList(repository = get()) }
}