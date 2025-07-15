import { graph, ObjectGraph, singleton, provides } from "react-obsidian";
import { ILabelFactory, ITodoFactory } from "todo-entity";
import {
    ICheckLabelExistRepository,
    ICreateLabelRepository,
    ICreateTodoInteractor,
    ICreateTodoPresenter,
    ICreateTodoRepository,
    ICreateTodoValidation,
    IGetAllLabelInteractor,
    IGetAllLabelPresenter,
    IGetAllLabelRepository,
    IGetLabelByIdRepository,
    IGetTodoByIdRepository,
    IGetUncompletedTodosInteractor,
    IGetUncompletedTodosPresenter,
    IGetUncompletedTodosRepository,
    IMarkTodoAsCompletedInteractor,
    IMarkTodoAsCompletedPresenter,
    IMarkTodoAsCompletedValidation,
    ISaveTodoRepository,
} from "todo-usecase";
import {
    CreateTodoInteractor,
    GetAllLabelInteractor,
    GetUncompletedTodosInteractor,
    MarkTodoAsCompletedInteractor,
} from "todo-usecase-default";
import { RepositoryGraph } from "./repository.graph";
import { PresenterGraph } from "./presenter.graph";
import { ValidationGraph } from "./validation.graph";
import { EntityGraph } from "./entity.graph";

@singleton()
@graph({
    subgraphs: [RepositoryGraph, PresenterGraph, ValidationGraph, EntityGraph],
})
export class InteractorGraph extends ObjectGraph {
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
    createTodoUseCase(
        createTodoValidation: ICreateTodoValidation,
        createTodoRepository: ICreateTodoRepository,
        createTodoPresenter: ICreateTodoPresenter,
        todoFactory: ITodoFactory,
        createLabelRepository: ICreateLabelRepository,
        checkLabelExistRepository: ICheckLabelExistRepository,
        getLabelByIdRepository: IGetLabelByIdRepository,
        labelFactory: ILabelFactory
    ): ICreateTodoInteractor {
        return new CreateTodoInteractor(
            createTodoValidation,
            createTodoRepository,
            createLabelRepository,
            checkLabelExistRepository,
            getLabelByIdRepository,
            createTodoPresenter,
            todoFactory,
            labelFactory
        );
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
    getAllLabelUseCase(
        getAllLabelRepository: IGetAllLabelRepository,
        getAllLabelPresenter: IGetAllLabelPresenter
    ): IGetAllLabelInteractor {
        return new GetAllLabelInteractor(
            getAllLabelRepository,
            getAllLabelPresenter
        );
    }
}
