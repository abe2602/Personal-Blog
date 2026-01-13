import { createContainer, asValue, asFunction } from 'awilix'
import * as PostsRemoteRepositoryImpl from "../data/posts/PostsRepository";
import HomeController from '../presentation/pages/home/HomeController';
import FavoritesController from '../presentation/pages/favorites/FavoritesController';
import GalleryController from '../presentation/pages/gallery/GalleryController';
import ThoughtsController from '../presentation/pages/thoughts/ThoughtsController';
import PostController from '../presentation/pages/post/PostController';


const container = createContainer({
    strict: true,
});

container.register({
    postsRepository: asValue(PostsRemoteRepositoryImpl),
    HomeController: asFunction(HomeController),
    FavoritesController: asFunction(FavoritesController),
    GalleryController: asFunction(GalleryController),
    ThoughtsController: asFunction(ThoughtsController),
    PostController: asFunction(PostController)
})

export default container