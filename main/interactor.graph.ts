import { graph, ObjectGraph, singleton, provides } from "react-obsidian";
import { ILabelFactory, ITodoFactory } from "todo-entity";
import {
    ICheckLabelExistRepository,
    ICreateLabelRepository,
    ICreateTodoInteractor,
    ICreateTodoPresenter,
    ICreateTodoRepository,
    ICreateTodoValidation,
    IEditTodoInteractor,
    IEditTodoPresenter,
    IEditTodoValidation,
    IGetAllLabelInteractor,
    IGetAllLabelPresenter,
    IGetAllLabelRepository,
    IGetAllTodoInteractor,
    IGetAllTodoPresenter,
    IGetAllTodoRepository,
    IGetAllTodoValidation,
    IGetLabelByIdRepository,
    IGetTodoByIdInteractor,
    IGetTodoByIdPresenter,
    IGetTodoByIdRepository,
    IGetTodoByIdValidation,
    IMarkTodoAsCompletedInteractor,
    IMarkTodoAsCompletedPresenter,
    IMarkTodoAsCompletedValidation,
    ISaveTodoRepository,
} from "todo-usecase";
import {
    CreateTodoInteractor,
    EditTodoInteractor,
    GetAllLabelInteractor,
    GetAllTodoInteractor,
    GetTodoByIdInteractor,
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
    getAllTodoUseCase(
        getAllTodoValidation: IGetAllTodoValidation,
        getAllTodoRepository: IGetAllTodoRepository,
        getAllTodoPresenter: IGetAllTodoPresenter
    ): IGetAllTodoInteractor {
        return new GetAllTodoInteractor(
            getAllTodoValidation,
            getAllTodoRepository,
            getAllTodoPresenter
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

    @provides()
    getTodoByIdUseCase(
        getTodoByIdValidation: IGetTodoByIdValidation,
        getTodoByIdRepository: IGetTodoByIdRepository,
        getTodoByIdPresenter: IGetTodoByIdPresenter
    ): IGetTodoByIdInteractor {
        return new GetTodoByIdInteractor(
            getTodoByIdValidation,
            getTodoByIdRepository,
            getTodoByIdPresenter
        );
    }

    @provides()
    editTodoUseCase(
        editTodoValidation: IEditTodoValidation,
        getTodoByIdRepository: IGetTodoByIdRepository,
        checkLabelExistRepository: ICheckLabelExistRepository,
        createLabelRepository: ICreateLabelRepository,
        getLabelByIdRepository: IGetLabelByIdRepository,
        saveTodoRepository: ISaveTodoRepository,
        editTodoPresenter: IEditTodoPresenter,
        labelFactory: ILabelFactory
    ): IEditTodoInteractor {
        return new EditTodoInteractor(
            editTodoValidation,
            getTodoByIdRepository,
            checkLabelExistRepository,
            createLabelRepository,
            getLabelByIdRepository,
            saveTodoRepository,
            editTodoPresenter,
            labelFactory
        );
    }
}
