import { IMarkTodoAsCompletedInteractor } from "todo-usecase";

export class CheckTodoController {
    constructor(
        private readonly checkTodoUseCase: IMarkTodoAsCompletedInteractor
    ) {}

    checkTodo = (todoId: string) => {
        this.checkTodoUseCase.execute({
            input: { todoId },
            timestamp: new Date().toISOString(),
        });
    };
}
