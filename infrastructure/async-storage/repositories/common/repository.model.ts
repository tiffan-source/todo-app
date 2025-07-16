export type TodoRepoSaveModel = {
    id: string;
    title: string;
    doneDate?: string;
    description?: string;
    labels?: string[];
    dueDate?: string;
};

export type LabelRepoSaveModel = {
    id: string;
    name: string;
    color: string;
};
