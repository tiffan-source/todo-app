import { graph, ObjectGraph, singleton, provides } from "react-obsidian";
import { ILabelFactory, ITodoFactory } from "todo-entity";
import {
    ICheckLabelExistRepository,
    ICreateLabelRepository,
    ICreateTodoInteractor,
    ICreateTodoPresenter,
    ICreateTodoRepository,
    ICreateTodoValidation,
    IGetLabelByIdRepository,
    IGetUncompletedTodosInteractor,
    IGetUncompletedTodosPresenter,
    IGetUncompletedTodosRepository,
} from "todo-usecase";
import {
    CreateTodoInteractor,
    GetUncompletedTodosInteractor,
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
}
