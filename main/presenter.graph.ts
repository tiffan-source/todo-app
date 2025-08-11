import { getAllUndoneTodoPresenter } from "@/components/backlog/all-unaccomplished-todo/stores/unaccomplished-todo.store";
import { createTodoPresenter } from "@/components/create-todo/todo-creation-form/stores/todo-created.store";
import { todoEditedPresenter } from "@/components/edit-todo/todo-edit-form/stores/todo-edited.store";
import { getAllTodayTodoPresenter } from "@/components/today/all-todo-due-today/stores/today-todo.store";
import { getAllLabelUseCase } from "@/store/label.store";
import {
    getTodoByIdForEditionPresenter,
    markTodoAsCompletedPresenter,
} from "@/store/todo.store";
import { graph, ObjectGraph, provides, singleton } from "react-obsidian";
import {
    ICreateTodoPresenter,
    IEditTodoPresenter,
    IGetAllLabelPresenter,
    IGetAllTodoPresenter,
    IGetTodoByIdPresenter,
    IMarkTodoAsCompletedPresenter,
} from "todo-usecase";

@singleton()
@graph()
export class PresenterGraph extends ObjectGraph {
    @provides()
    getAllUnDoneTodoPresenter(): IGetAllTodoPresenter {
        return getAllUndoneTodoPresenter;
    }

    @provides()
    createTodoPresenter(): ICreateTodoPresenter {
        return createTodoPresenter;
    }

    @provides()
    checkTodoPresenter(): IMarkTodoAsCompletedPresenter {
        return markTodoAsCompletedPresenter;
    }

    @provides()
    getAllTodayTodoPresenter(): IGetAllTodoPresenter {
        return getAllTodayTodoPresenter;
    }

    @provides()
    getAllLabelPresenter(): IGetAllLabelPresenter {
        return getAllLabelUseCase;
    }

    @provides()
    getTodoByIdForEditionPresenter(): IGetTodoByIdPresenter {
        return getTodoByIdForEditionPresenter;
    }

    @provides()
    editTodoPresenter(): IEditTodoPresenter {
        return todoEditedPresenter;
    }
}
