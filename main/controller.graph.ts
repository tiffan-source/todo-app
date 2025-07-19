import { CreateTodoController } from "@/back-for-front/todo-creation/controllers/create-todo.controller";
import { graph, ObjectGraph, provides, singleton } from "react-obsidian";
import {
    ICreateTodoInteractor,
    IGetAllLabelInteractor,
    IGetAllTodoInteractor,
    IMarkTodoAsCompletedInteractor,
} from "todo-usecase";
import { InteractorGraph } from "./interactor.graph";
import { CheckTodoController } from "@/back-for-front/todo-modification/controllers/mark-todo-as-completed.controller";
import { GetAllLabelController } from "@/back-for-front/label-retrieval/controllers/get-all-label.controller";
import { GetAllTodoController } from "@/back-for-front/todo-retrieval/controllers/get-all-todo.controller";

@singleton()
@graph({ subgraphs: [InteractorGraph] })
export class ControllerGraph extends ObjectGraph {
    @provides()
    createTodoController(createTodoUseCase: ICreateTodoInteractor) {
        return new CreateTodoController(createTodoUseCase);
    }

    @provides()
    getAllTodoController(getAllTodoUseCase: IGetAllTodoInteractor) {
        return new GetAllTodoController(getAllTodoUseCase);
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
