import { CreateTodoController } from "@/back-for-front/todo-creation/controllers/create-todo.controller";
import { GetAllUnaccomplishedTodoTodoController } from "@/back-for-front/todo-retrieval/controllers/get-all-unaccomplishedTodo-todo.controller";
import { graph, ObjectGraph, provides, singleton } from "react-obsidian";
import {
    ICreateTodoInteractor,
    IGetAllLabelInteractor,
    IGetUncompletedTodosInteractor,
    IMarkTodoAsCompletedInteractor,
} from "todo-usecase";
import { InteractorGraph } from "./interactor.graph";
import { CheckTodoController } from "@/back-for-front/todo-modification/controllers/mark-todo-as-completed.controller";
import { GetAllLabelController } from "@/back-for-front/label-retrieval/controllers/get-all-label.controller";

@singleton()
@graph({ subgraphs: [InteractorGraph] })
export class ControllerGraph extends ObjectGraph {
    @provides()
    createTodoController(createTodoUseCase: ICreateTodoInteractor) {
        return new CreateTodoController(createTodoUseCase);
    }

    @provides()
    getAllUnaccomplishedTodoController(
        getAllUnaccomplishedTodoUseCase: IGetUncompletedTodosInteractor
    ) {
        return new GetAllUnaccomplishedTodoTodoController(
            getAllUnaccomplishedTodoUseCase
        );
    }

    @provides()
    checkTodoController(checkTodoUseCase: IMarkTodoAsCompletedInteractor) {
        return new CheckTodoController(checkTodoUseCase);
    }

    @provides()
    getAllLabelController(getAllLabelUseCase: IGetAllLabelInteractor) {
        return new GetAllLabelController(getAllLabelUseCase);
    }
}
