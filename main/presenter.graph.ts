import { GetAllLabelPresenter } from "@/back-for-front/label-retrieval/presenters/get-all-label.presenter";
import { LabelViewModel } from "@/back-for-front/shared/view-models/LabelViewModel";
import { TodoCheckViewModel } from "@/back-for-front/shared/view-models/TodoCheckViewModel";
import { TodoCreatedViewModel } from "@/back-for-front/shared/view-models/TodoCreatedViewModel";
import { TodoTicketViewModel } from "@/back-for-front/shared/view-models/TodoTicketViewModel";
import { CreateTodoPresenter } from "@/back-for-front/todo-creation/presenters/create-todo.presenter";
import { MarkTodoAsCompletedPresenter } from "@/back-for-front/todo-modification/presenters/mark-todo-as-completed.presenter";
import { GetAllUnaccomplishedTodoPresenter } from "@/back-for-front/todo-retrieval/presenters/get-all-unaccomplishedTodo-todo.presenter";
import { useLabelStore } from "@/store/label.store";
import { useTodoCheckStore } from "@/store/todo-check.store";
import { useTodoCreateStore } from "@/store/todo-create.store";
import { useTodoStore } from "@/store/todo.store";
import { graph, ObjectGraph, singleton, provides } from "react-obsidian";
import {
    ICreateTodoPresenter,
    IGetAllLabelPresenter,
    IGetUncompletedTodosPresenter,
    IMarkTodoAsCompletedPresenter,
} from "todo-usecase";

@singleton()
@graph()
export class PresenterGraph extends ObjectGraph {
    @provides()
    getAllUnaccomplishedTodoPresenter(): IGetUncompletedTodosPresenter {
        return new GetAllUnaccomplishedTodoPresenter(
            useTodoStore.getState().setTodos
        );
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
}
