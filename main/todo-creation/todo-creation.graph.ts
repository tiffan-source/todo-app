import { TodoCreatedViewModel } from "@/back-for-front/shared/view-models/TodoCreatedViewModel";
import { CreateTodoController } from "@/back-for-front/todo-creation/controllers/create-todo.controller";
import { CreateTodoPresenter } from "@/back-for-front/todo-creation/presenters/create-todo.presenter";
import { CreateTodoAsyncStorageRepository } from "@/infrastructure/async-storage/repositories/todo-creation/create-todo.async-storage.repository";
import "react-native-get-random-values"; // Todo factory requires this polyfill since it uses uuid
import { graph, ObjectGraph, provides, singleton } from "react-obsidian";
import { ITodoFactory } from "todo-entity";
import { TodoFactory } from "todo-entity-default";
import {
    ICreateTodoInteractor,
    ICreateTodoPresenter,
    ICreateTodoRepository,
    ICreateTodoValidation,
} from "todo-usecase";
import {
    CreateTodoInteractor,
    CreateTodoValidation,
} from "todo-usecase-default";
import { CommonGraph } from "../common/common.graph";

@singleton()
@graph({ subgraphs: [CommonGraph] })
export class TodoCreationGraph extends ObjectGraph {
    @provides()
    createTodoController(createTodoUseCase: ICreateTodoInteractor) {
        return new CreateTodoController(createTodoUseCase);
    }

    @provides()
    createTodoUseCase(
        createTodoValidation: ICreateTodoValidation,
        createTodoRepository: ICreateTodoRepository,
        createTodoPresenter: ICreateTodoPresenter,
        todoFactory: ITodoFactory
    ): ICreateTodoInteractor {
        return new CreateTodoInteractor(
            createTodoValidation,
            createTodoRepository,
            createTodoPresenter,
            todoFactory
        );
    }

    @provides()
    createTodoPresenter(): ICreateTodoPresenter<TodoCreatedViewModel> {
        return new CreateTodoPresenter();
    }

    @provides()
    createTodoValidation(): ICreateTodoValidation {
        return new CreateTodoValidation();
    }

    @provides()
    createTodoRepository(): ICreateTodoRepository {
        return new CreateTodoAsyncStorageRepository();
    }
}
