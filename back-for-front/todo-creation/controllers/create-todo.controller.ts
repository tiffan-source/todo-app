import { ICreateTodoInteractor } from "todo-usecase";

export class CreateTodoController {
    constructor(private readonly createTodoUseCase: ICreateTodoInteractor) {}

    createTodo = (
        title: string,
        description?: string,
        labelIds?: string[],
        labelTitles?: string[],
        dueDate?: Date
    ) => {
        this.createTodoUseCase.execute({
            input: {
                title,
                description,
                newLabelTitles: labelTitles,
                labelIds,
                dueDate,
            },
            timestamp: new Date().toISOString(),
        });
    };
}
