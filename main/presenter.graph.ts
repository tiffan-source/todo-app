import { TodoCreatedViewModel } from "@/back-for-front/shared/view-models/TodoCreatedViewModel";
import { TodoTicketViewModel } from "@/back-for-front/shared/view-models/TodoTicketViewModel";
import { CreateTodoPresenter } from "@/back-for-front/todo-creation/presenters/create-todo.presenter";
import { GetAllUnaccomplishedTodoPresenter } from "@/back-for-front/todo-retrieval/presenters/get-all-unaccomplishedTodo-todo.presenter";
import { graph, ObjectGraph, singleton, provides } from "react-obsidian";
import {
    ICreateTodoPresenter,
    IGetUncompletedTodosPresenter,
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
}
