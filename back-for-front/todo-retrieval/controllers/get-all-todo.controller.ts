import { IGetAllTodoInteractor } from "todo-usecase";

export class GetAllTodoController {
    constructor(private readonly getAllTodoUseCase: IGetAllTodoInteractor) {}

    getAllTodos = () => {
        this.getAllTodoUseCase.execute({
            input: {} as never,
            timestamp: new Date().toISOString(),
        });
    };
}
