import { GetAllLabelPresenter } from "@/back-for-front/label-retrieval/presenters/get-all-label.presenter";
import { LabelViewModel } from "@/back-for-front/shared/view-models/LabelViewModel";
import { TodoCheckViewModel } from "@/back-for-front/shared/view-models/TodoCheckViewModel";
import { TodoCreatedViewModel } from "@/back-for-front/shared/view-models/TodoCreatedViewModel";
import { TodoTicketViewModel } from "@/back-for-front/shared/view-models/TodoTicketViewModel";
import { CreateTodoPresenter } from "@/back-for-front/todo-creation/presenters/create-todo.presenter";
import { MarkTodoAsCompletedPresenter } from "@/back-for-front/todo-modification/presenters/mark-todo-as-completed.presenter";
import { GetAllUnaccomplishedTodoPresenter } from "@/back-for-front/todo-retrieval/presenters/get-all-unaccomplishedTodo-todo.presenter";
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
    getAllUnaccomplishedTodoPresenter(): IGetUncompletedTodosPresenter<
        TodoTicketViewModel[]
    > {
        return new GetAllUnaccomplishedTodoPresenter();
    }

    @provides()
    createTodoPresenter(): ICreateTodoPresenter<TodoCreatedViewModel> {
        return new CreateTodoPresenter();
    }

    @provides()
    checkTodoPresenter(): IMarkTodoAsCompletedPresenter<TodoCheckViewModel> {
        return new MarkTodoAsCompletedPresenter();
    }

    @provides()
    getAllLabelPresenter(): IGetAllLabelPresenter<LabelViewModel[]> {
        return new GetAllLabelPresenter();
    }
}
