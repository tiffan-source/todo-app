export interface TodoTicketViewModel {
    id: string;
    title: string;
    description?: string;
    checked: boolean;
    labels: {
        id: string;
        name: string;
        color: string;
    }[];
    dueDate?: string;
}
