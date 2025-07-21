import { IEditTodoInteractor } from "todo-usecase";

export class EditTodoController {
    constructor(private readonly editTodoUsecase: IEditTodoInteractor) {}

    editTodo(
        todoId: string,
        newData: {
            title?: string;
            description?: string;
            dueDate?: Date;
            labelIds?: string[];
            newLabelTitles?: string[];
        }
    ) {
        const { title, description, dueDate, labelIds, newLabelTitles } =
            newData;

        this.editTodoUsecase.execute({
            timestamp: new Date(),
            input: {
                todoId,
                newData: {
                    description,
                    dueDate,
                    labelIds,
                    newLabelTitles,
                    title,
                },
            },
        });
    }
}
