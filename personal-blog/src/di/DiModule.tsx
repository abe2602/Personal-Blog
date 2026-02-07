import { createContainer, asValue, asFunction } from 'awilix'
import * as PostsRemoteRepositoryImpl from "../data/posts/PostsRepository";
import * as ProfileRepositoryImpl from "../data/profile/ProfileRepository";
import HomeController from '../presentation/pages/home/HomeController';
import FavoritesController from '../presentation/pages/favorites/FavoritesController';
import GalleryController from '../presentation/pages/gallery/GalleryController';
import ThoughtsController from '../presentation/pages/thoughts/ThoughtsController';
import SearchListController from '../presentation/pages/search_list/SearchListController';
import PostController from '../presentation/pages/post/PostController';
import ProfileSideMenuController from '../presentation/components/profile_sidemenu/ProfileSideMenuController';

const container = createContainer({
    strict: true,
});

container.register({
    postsRepository: asValue(PostsRemoteRepositoryImpl),
    profileRepository: asValue(ProfileRepositoryImpl),
    HomeController: asFunction(HomeController),
    FavoritesController: asFunction(FavoritesController),
    GalleryController: asFunction(GalleryController),
    ThoughtsController: asFunction(ThoughtsController),
    SearchListController: asFunction(SearchListController),
    PostController: asFunction(PostController),
    ProfileSideMenuController: asFunction(ProfileSideMenuController)
})

export default container