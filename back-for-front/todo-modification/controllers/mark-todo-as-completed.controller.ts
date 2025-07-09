import { IMarkTodoAsCompletedInteractor } from "todo-usecase";

export class CheckTodoController {
    constructor(
        private readonly checkTodoUseCase: IMarkTodoAsCompletedInteractor
    ) {}

    checkTodo = (todoId: string) => {
        console.log("Checking todo with ID:", todoId);
        this.checkTodoUseCase.execute({
            input: { todoId },
            timestamp: new Date().toISOString(),
        });
    };
}
