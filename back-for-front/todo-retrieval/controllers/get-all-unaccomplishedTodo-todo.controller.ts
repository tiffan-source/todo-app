import { IGetUncompletedTodosInteractor } from "todo-usecase";

export class GetAllUnaccomplishedTodoTodoController {
    constructor(
        private readonly getAllUnaccomplishedTodoUseCase: IGetUncompletedTodosInteractor
    ) {}

    getAllTodos = () => {
        this.getAllUnaccomplishedTodoUseCase.execute({
            input: {} as never,
            timestamp: new Date().toISOString(),
        });
    };
}
