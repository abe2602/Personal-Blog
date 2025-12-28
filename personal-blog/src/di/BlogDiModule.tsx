import { createContainer, asValue, asFunction } from 'awilix'
import * as PostsRemoteDataSource from "../data/posts/PostsRemoteDataSource";
import HomeController from '../pages/home/HomeController';

const container = createContainer({
    strict: true,
});

container.register({
    PostsRemoteDataSource: asValue(PostsRemoteDataSource),
    HomeController: asFunction(HomeController)
})

export default container