import { GetTodoByIdAsyncStorageRepository } from "@/infrastructure/async-storage/repositories/todo-retrieval/get-todo-by-id.async-storage.repository";
import { graph, ObjectGraph, provides, singleton } from "react-obsidian";
import { ITodoFactory } from "todo-entity";
import {
    IGetTodoByIdRepository,
    IMarkTodoAsCompletedInteractor,
    IMarkTodoAsCompletedPresenter,
    IMarkTodoAsCompletedValidation,
    ISaveTodoRepository,
} from "todo-usecase";
import {
    MarkTodoAsCompletedInteractor,
    MarkTodoAsCompletedValidation,
} from "todo-usecase-default";
import { CommonGraph } from "../common/common.graph";
import { MarkTodoAsCompletedPresenter } from "@/back-for-front/todo-modification/presenters/mark-todo-as-completed.presenter";
import { CheckTodoController } from "@/back-for-front/todo-modification/controllers/mark-todo-as-completed.controller";
import { TodoCheckViewModel } from "@/back-for-front/shared/view-models/TodoCheckViewModel";

@singleton()
@graph({ subgraphs: [CommonGraph] })
export class TodoModificationGraph extends ObjectGraph {
    @provides()
    checkTodoController(checkTodoUseCase: IMarkTodoAsCompletedInteractor) {
        return new CheckTodoController(checkTodoUseCase);
    }

    @provides()
    checkTodoUseCase(
        markTodoValidator: IMarkTodoAsCompletedValidation,
        getTodoByIdRepository: IGetTodoByIdRepository,
        saveTodoRepository: ISaveTodoRepository,
        checkTodoPresenter: IMarkTodoAsCompletedPresenter
    ): IMarkTodoAsCompletedInteractor {
        return new MarkTodoAsCompletedInteractor(
            markTodoValidator,
            getTodoByIdRepository,
            saveTodoRepository,
            checkTodoPresenter
        );
    }

    @provides()
    markTodoValidator(): IMarkTodoAsCompletedValidation {
        return new MarkTodoAsCompletedValidation();
    }

    @provides()
    getTodoByIdRepository(todoFactory: ITodoFactory): IGetTodoByIdRepository {
        return new GetTodoByIdAsyncStorageRepository(todoFactory);
    }

    @provides()
    checkTodoPresenter(): IMarkTodoAsCompletedPresenter<TodoCheckViewModel> {
        return new MarkTodoAsCompletedPresenter();
    }
}
