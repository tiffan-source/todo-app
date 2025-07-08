import { TodoTicketViewModel } from "@/back-for-front/shared/view-models/TodoTicketViewModel";
import { GetAllUnaccomplishedTodoTodoController } from "@/back-for-front/todo-retrieval/controllers/get-all-unaccomplishedTodo-todo.controller";
import { GetAllUnaccomplishedTodoPresenter } from "@/back-for-front/todo-retrieval/presenters/get-all-unaccomplishedTodo-todo.presenter";
import { GetAllUnaccomplishedTodoTodoAsyncStorageRepository } from "@/infrastructure/async-storage/repositories/todo-retrieval/get-all-unaccomplishedTodo-todo.async-storage.repository";
import { graph, ObjectGraph, provides, singleton } from "react-obsidian";
import { ITodoFactory } from "todo-entity";
import { TodoFactory } from "todo-entity-default";
import {
    IGetAllTodoInteractor,
    IGetAllTodoPresenter,
    IGetAllTodoRepository,
    IGetUncompletedTodosInteractor,
    IGetUncompletedTodosPresenter,
    IGetUncompletedTodosRepository,
} from "todo-usecase";
import {
    GetAllTodoInteractor,
    GetUncompletedTodosInteractor,
} from "todo-usecase-default";

@singleton()
@graph()
export class TodoRetrievalGraph extends ObjectGraph {
    @provides()
    getAllUnaccomplishedTodoController(
        getAllUnaccomplishedTodoUseCase: IGetUncompletedTodosInteractor
    ) {
        return new GetAllUnaccomplishedTodoTodoController(
            getAllUnaccomplishedTodoUseCase
        );
    }

    @provides()
    getAllUnaccomplishedTodoUseCase(
        getAllUnaccomplishedTodoRepository: IGetUncompletedTodosRepository,
        getAllUnaccomplishedTodoPresenter: IGetUncompletedTodosPresenter
    ): IGetUncompletedTodosInteractor {
        return new GetUncompletedTodosInteractor(
            getAllUnaccomplishedTodoRepository,
            getAllUnaccomplishedTodoPresenter
        );
    }

    @provides()
    getAllUnaccomplishedTodoPresenter(): IGetUncompletedTodosPresenter<
        TodoTicketViewModel[]
    > {
        return new GetAllUnaccomplishedTodoPresenter();
    }

    @provides()
    getAllUnaccomplishedTodoRepository(
        todoFactory: ITodoFactory
    ): IGetUncompletedTodosRepository {
        return new GetAllUnaccomplishedTodoTodoAsyncStorageRepository(
            todoFactory
        );
    }

    @provides()
    todoFactory(): ITodoFactory {
        return new TodoFactory();
    }
}
