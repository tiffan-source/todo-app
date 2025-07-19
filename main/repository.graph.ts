import { CreateTodoAsyncStorageRepository } from "@/infrastructure/async-storage/repositories/todo-creation/create-todo.async-storage.repository";
import { graph, ObjectGraph, singleton, provides } from "react-obsidian";
import { ILabelFactory, ITodoFactory } from "todo-entity";
import {
    ICheckLabelExistRepository,
    ICreateLabelRepository,
    ICreateTodoRepository,
    IGetAllLabelRepository,
    IGetAllTodoRepository,
    IGetLabelByIdRepository,
    IGetTodoByIdRepository,
    ISaveTodoRepository,
} from "todo-usecase";
import { EntityGraph } from "./entity.graph";
import { CreateLabelAsyncStorageRepository } from "@/infrastructure/async-storage/repositories/label-creation/create-label.async-storage.repository";
import { CheckLabelExistAsyncStorageRepository } from "@/infrastructure/async-storage/repositories/label-retrieval/check-label-exist.async-storage.repository";
import { GetLabelByIdAsyncStorageRepository } from "@/infrastructure/async-storage/repositories/label-retrieval/get-label-by-id.async-storage.repository";
import { GetTodoByIdAsyncStorageRepository } from "@/infrastructure/async-storage/repositories/todo-retrieval/get-todo-by-id.async-storage.repository";
import { SaveTodoAsyncStorageRepository } from "@/infrastructure/async-storage/repositories/common/save-todo.async-storage.repository";
import { GetAllLabelAsyncStorageRepository } from "@/infrastructure/async-storage/repositories/label-retrieval/get-all-label.async-storage.repository";
import { GetAllTodoAsyncStorageRepository } from "@/infrastructure/async-storage/repositories/todo-retrieval/get-all-todo.async-storage.repository";

@singleton()
@graph({
    subgraphs: [EntityGraph],
})
export class RepositoryGraph extends ObjectGraph {
    @provides()
    getAllTodoRepository(
        todoFactory: ITodoFactory,
        labelFactory: ILabelFactory
    ): IGetAllTodoRepository {
        return new GetAllTodoAsyncStorageRepository(todoFactory, labelFactory);
    }

    @provides()
    createTodoRepository(): ICreateTodoRepository {
        return new CreateTodoAsyncStorageRepository();
    }

    @provides()
    createLabelRepository(): ICreateLabelRepository {
        return new CreateLabelAsyncStorageRepository();
    }

    @provides()
    checkLabelExistRepository(): ICheckLabelExistRepository {
        return new CheckLabelExistAsyncStorageRepository();
    }

    @provides()
    getLabelByIdRepository(
        labelFactory: ILabelFactory
    ): IGetLabelByIdRepository {
        return new GetLabelByIdAsyncStorageRepository(labelFactory);
    }

    @provides()
    getTodoByIdRepository(todoFactory: ITodoFactory): IGetTodoByIdRepository {
        return new GetTodoByIdAsyncStorageRepository(todoFactory);
    }

    @provides()
    saveTodoRepository(): ISaveTodoRepository {
        return new SaveTodoAsyncStorageRepository();
    }

    @provides()
    getAllLabelRepository(labelFactory: ILabelFactory): IGetAllLabelRepository {
        return new GetAllLabelAsyncStorageRepository(labelFactory);
    }
}
