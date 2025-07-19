import { IGetAllTodoInteractor } from "todo-usecase";

export class GetAllTodoController {
    constructor(private readonly getAllTodoUseCase: IGetAllTodoInteractor) {}

    getAllTodos = (filters?: { done?: boolean; dueDate?: Date[] }) => {
        this.getAllTodoUseCase.execute({
            input: {
                filters: filters,
            },
            timestamp: new Date().toISOString(),
        });
    };
}
