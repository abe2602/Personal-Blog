import { createContainer, asValue, asFunction } from 'awilix'
import * as PostsRemoteRepositoryImpl from "../data/posts/PostsRepository";
import HomeController from '../presentation/pages/home/HomeController';

const container = createContainer({
    strict: true,
});

container.register({
    postsRepository: asValue(PostsRemoteRepositoryImpl),
    HomeController: asFunction(HomeController)
})

export default container