import { graph, ObjectGraph, singleton, provides } from "react-obsidian";
import {
    ICreateTodoValidation,
    IGetAllTodoValidation,
    IMarkTodoAsCompletedValidation,
} from "todo-usecase";
import {
    CreateTodoValidation,
    GetAllTodoValidation,
    MarkTodoAsCompletedValidation,
} from "todo-usecase-default";

@singleton()
@graph()
export class ValidationGraph extends ObjectGraph {
    @provides()
    createTodoValidation(): ICreateTodoValidation {
        return new CreateTodoValidation();
    }

    @provides()
    markTodoValidator(): IMarkTodoAsCompletedValidation {
        return new MarkTodoAsCompletedValidation();
    }

    @provides()
    getAllTodoValidation(): IGetAllTodoValidation {
        return new GetAllTodoValidation();
    }
}
