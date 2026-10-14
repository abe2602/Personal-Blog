package org.example.di

import org.example.domain.usecase.EditPost
import org.example.domain.usecase.GetPost
import org.example.domain.usecase.GetPostsList
import org.example.domain.usecase.RemovePost
import org.example.domain.usecase.SavePost
import org.koin.dsl.module

val appModule = module {
    factory { GetPost(repository = get()) }
    factory { GetPostsList(repository = get()) }
    factory { SavePost(repository = get()) }
    factory { RemovePost(repository = get()) }
    factory { EditPost(repository = get()) }
}