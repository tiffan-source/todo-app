import { CreateTodoController } from "@/back-for-front/todo-creation/controllers/create-todo.controller";
import { GetAllUnaccomplishedTodoTodoController } from "@/back-for-front/todo-retrieval/controllers/get-all-unaccomplishedTodo-todo.controller";
import { graph, ObjectGraph, provides, singleton } from "react-obsidian";
import {
    ICreateTodoInteractor,
    IGetUncompletedTodosInteractor,
} from "todo-usecase";
import { InteractorGraph } from "./interactor.graph";

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
}
