import { GetAllLabelPresenter } from "@/back-for-front/label-retrieval/presenters/get-all-label.presenter";
import { CreateTodoPresenter } from "@/back-for-front/todo-creation/presenters/create-todo.presenter";
import { EditTodoPresenter } from "@/back-for-front/todo-modification/presenters/edit-todo.presenter";
import { MarkTodoAsCompletedPresenter } from "@/back-for-front/todo-modification/presenters/mark-todo-as-completed.presenter";
import { GetAllTodoPresenter } from "@/back-for-front/todo-retrieval/presenters/get-all-todo.presenter";
import { GetTodoByIdPresenter } from "@/back-for-front/todo-retrieval/presenters/get-todo-by-id.presenter";
import { useLabelStore } from "@/store/label.store";
import { useSelectTodoForEditionStore } from "@/store/select-todo-for-edition.store";
import { useTodoCheckStore } from "@/store/todo-check.store";
import { useTodoCreateStore } from "@/store/todo-create.store";
import { useTodoStore } from "@/store/todo.store";
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
    getAllTodoPresenter(): IGetAllTodoPresenter {
        return new GetAllTodoPresenter(useTodoStore.getState().setTodos);
    }

    @provides()
    createTodoPresenter(): ICreateTodoPresenter {
        return new CreateTodoPresenter(
            useTodoCreateStore.getState().setTodoCreate
        );
    }

    @provides()
    checkTodoPresenter(): IMarkTodoAsCompletedPresenter {
        return new MarkTodoAsCompletedPresenter(
            useTodoCheckStore.getState().setTodoCheck
        );
    }

    @provides()
    getAllLabelPresenter(): IGetAllLabelPresenter {
        return new GetAllLabelPresenter(useLabelStore.getState().setLabels);
    }

    @provides()
    getTodoByIdPresenter(): IGetTodoByIdPresenter {
        return new GetTodoByIdPresenter(
            useSelectTodoForEditionStore.getState().setEditionTodo
        );
    }

    @provides()
    editTodoPresenter(): IEditTodoPresenter {
        return new EditTodoPresenter(
            useSelectTodoForEditionStore.getState().setEditionTodo
        );
    }
}
