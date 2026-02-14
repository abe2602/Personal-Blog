import { createContainer, asValue, asFunction } from "awilix";
import * as DummyRepositoryImpl from "../data/dummy/DummyRepository";
import * as PostsRepositoryImpl from "../data/posts/PostsRepository";
import DashboardController from "../presentation/pages/dashboard/DashboardController";
import ComposeController from "../presentation/pages/compose/ComposeController";

const container = createContainer({
  strict: true,
});

container.register({
  dummyRepository: asValue(DummyRepositoryImpl),
  postsRepository: asValue(PostsRepositoryImpl),
  DashboardController: asFunction(DashboardController),
  ComposeController: asFunction(ComposeController),
});

export default container;
