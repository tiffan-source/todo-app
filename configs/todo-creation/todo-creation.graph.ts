import { CreateTodoController } from "@/components/todo-creation/todo-creation-form/controllers/create-todo.controllers";
import { CreateTodoPresenter } from "@/components/todo-creation/todo-creation-form/presenters/create-todo.presenter";
import { graph, ObjectGraph, provides, singleton } from "react-obsidian";
import {
    CreateTodoRepositoryInput,
    CreateTodoRepositoryOutput,
    ICreateTodoInteractor,
    ICreateTodoPresenter,
    ICreateTodoRepository,
    ICreateTodoValidation,
} from "todo-usecase";
import {
    CreateTodoInteractor,
    CreateTodoValidation,
} from "todo-usecase-default";
import { ITodoFactory } from "todo-entity";
import { TodoFactory } from "todo-entity-default";
import { CreateTodoAsyncStorageRepository } from "@/infrastructure/repositories/todo-creation/create-todo.async-storage.repository";
@singleton()
@graph()
export class TodoCreationGraph extends ObjectGraph {
    @provides()
    createTodoController(
        createTodoUseCase: ICreateTodoInteractor
    ): CreateTodoController {
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
    todoFactory(): ITodoFactory {
        return new TodoFactory();
    }

    @provides()
    createTodoPresenter(): ICreateTodoPresenter {
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
