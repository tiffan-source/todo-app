import { CreateTodoAsyncStorageRepository } from "@/infrastructure/async-storage/repositories/todo-creation/create-todo.async-storage.repository";
import { GetAllUnaccomplishedTodoTodoAsyncStorageRepository } from "@/infrastructure/async-storage/repositories/todo-retrieval/get-all-unaccomplishedTodo-todo.async-storage.repository";
import { graph, ObjectGraph, singleton, provides } from "react-obsidian";
import { ILabelFactory, ITodoFactory } from "todo-entity";
import {
    ICheckLabelExistRepository,
    ICreateLabelRepository,
    ICreateTodoRepository,
    IGetLabelByIdRepository,
    IGetUncompletedTodosRepository,
} from "todo-usecase";
import { EntityGraph } from "./entity.graph";
import { CreateLabelAsyncStorageRepository } from "@/infrastructure/async-storage/repositories/label-creation/create-label.async-storage.repository";
import { CheckLabelExistAsyncStorageRepository } from "@/infrastructure/async-storage/repositories/label-retrieval/check-label-exist.async-storage.repository";
import { GetLabelByIdAsyncStorageRepository } from "@/infrastructure/async-storage/repositories/label-retrieval/get-label-by-id.async-storage.repository";

@singleton()
@graph({
    subgraphs: [EntityGraph],
})
export class RepositoryGraph extends ObjectGraph {
    @provides()
    getAllUnaccomplishedTodoRepository(
        todoFactory: ITodoFactory,
        labelFactory: ILabelFactory
    ): IGetUncompletedTodosRepository {
        return new GetAllUnaccomplishedTodoTodoAsyncStorageRepository(
            todoFactory,
            labelFactory
        );
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
}
