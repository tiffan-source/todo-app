import { ICreateTodoInteractor } from "todo-usecase";

export class CreateTodoController {
    constructor(private readonly createTodoUseCase: ICreateTodoInteractor) {}

    createTodo = (title: string, description?: string) => {
        this.createTodoUseCase.execute({
            input: { title, description },
            timestamp: new Date().toISOString(),
        });
    };
}
