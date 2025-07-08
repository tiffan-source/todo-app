import { TodoTicketViewModel } from "@/back-for-front/shared/view-models/TodoTicketViewModel";
import { GetAllTodoController } from "@/back-for-front/todo-retrieval/controllers/get-all-todo.controller";
import { GetAllTodoPresenter } from "@/back-for-front/todo-retrieval/presenters/get-all-todo.presenter";
import { GetAllTodoAsyncStorageRepository } from "@/infrastructure/async-storage/repositories/todo-retrieval/get-all-todo.async-storage.repository";
import { graph, ObjectGraph, provides, singleton } from "react-obsidian";
import { ITodoFactory } from "todo-entity";
import { TodoFactory } from "todo-entity-default";
import {
    IGetAllTodoInteractor,
    IGetAllTodoPresenter,
    IGetAllTodoRepository,
} from "todo-usecase";
import { GetAllTodoInteractor } from "todo-usecase-default";

@singleton()
@graph()
export class TodoRetrievalGraph extends ObjectGraph {
    @provides()
    getAllTodoController(getAllTodoUseCase: IGetAllTodoInteractor) {
        return new GetAllTodoController(getAllTodoUseCase);
    }

    @provides()
    getAllTodoUseCase(
        getAllTodoRepository: IGetAllTodoRepository,
        getAllTodoPresenter: IGetAllTodoPresenter
    ): IGetAllTodoInteractor {
        return new GetAllTodoInteractor(
            getAllTodoRepository,
            getAllTodoPresenter
        );
    }

    @provides()
    getAllTodoPresenter(): IGetAllTodoPresenter<TodoTicketViewModel[]> {
        return new GetAllTodoPresenter();
    }

    @provides()
    getAllTodoRepository(todoFactory: ITodoFactory): IGetAllTodoRepository {
        return new GetAllTodoAsyncStorageRepository(todoFactory);
    }

    @provides()
    todoFactory(): ITodoFactory {
        return new TodoFactory();
    }
}
