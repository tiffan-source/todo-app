import { graph, ObjectGraph, singleton, provides } from "react-obsidian";
import {
    ICreateTodoValidation,
    IEditTodoValidation,
    IGetAllTodoValidation,
    IGetTodoByIdValidation,
    IMarkTodoAsCompletedValidation,
} from "todo-usecase";
import {
    CreateTodoValidation,
    EditTodoValidation,
    GetAllTodoValidation,
    GetTodoByIdValidation,
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

    @provides()
    getTodoByIdValidation(): IGetTodoByIdValidation {
        return new GetTodoByIdValidation();
    }

    @provides()
    editTodoValidation(): IEditTodoValidation {
        return new EditTodoValidation();
    }
}
