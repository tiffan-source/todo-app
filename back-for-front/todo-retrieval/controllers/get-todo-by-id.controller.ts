import { IGetTodoByIdInteractor } from "todo-usecase";

export class GetTodoByIdController {
    constructor(private readonly getTodoByIdUseCase: IGetTodoByIdInteractor) {}

    getTodoById = (todoId: string) => {
        this.getTodoByIdUseCase.execute({
            input: {
                idTodo: todoId,
            },
            timestamp: new Date().toISOString(),
        });
    };
}
