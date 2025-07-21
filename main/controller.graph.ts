import { CreateTodoController } from "@/back-for-front/todo-creation/controllers/create-todo.controller";
import { graph, ObjectGraph, provides, singleton } from "react-obsidian";
import {
    ICreateTodoInteractor,
    IEditTodoInteractor,
    IGetAllLabelInteractor,
    IGetAllTodoInteractor,
    IGetTodoByIdInteractor,
    IMarkTodoAsCompletedInteractor,
} from "todo-usecase";
import { InteractorGraph } from "./interactor.graph";
import { CheckTodoController } from "@/back-for-front/todo-modification/controllers/mark-todo-as-completed.controller";
import { GetAllLabelController } from "@/back-for-front/label-retrieval/controllers/get-all-label.controller";
import { GetAllTodoController } from "@/back-for-front/todo-retrieval/controllers/get-all-todo.controller";
import { GetTodoByIdController } from "@/back-for-front/todo-retrieval/controllers/get-todo-by-id.controller";
import { EditTodoInteractor } from "todo-usecase-default";
import { EditTodoController } from "@/back-for-front/todo-modification/controllers/edit-todo.controller";

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
    getTodoByIdController(getTodoByIdUseCase: IGetTodoByIdInteractor) {
        return new GetTodoByIdController(getTodoByIdUseCase);
    }

    @provides()
    checkTodoController(checkTodoUseCase: IMarkTodoAsCompletedInteractor) {
        return new CheckTodoController(checkTodoUseCase);
    }

    @provides()
    getAllLabelController(getAllLabelUseCase: IGetAllLabelInteractor) {
        return new GetAllLabelController(getAllLabelUseCase);
    }

    @provides()
    editTodoController(editTodoUseCase: IEditTodoInteractor) {
        return new EditTodoController(editTodoUseCase);
    }
}
