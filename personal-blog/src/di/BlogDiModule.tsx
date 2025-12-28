import { createContainer, asValue, asFunction } from 'awilix'
import * as PostsRemoteDataSource from "../data/posts/PostsRemoteDataSource";
import HomeViewModel from '../pages/home/HomeViewModel';

const container = createContainer({
    strict: true,
});

container.register({
    PostsRemoteDataSource: asValue(PostsRemoteDataSource),
    HomeViewModel: asFunction(HomeViewModel)
})

export default container