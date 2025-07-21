import { TodoTicketViewModel } from "./TodoTicketViewModel";

export interface TodoEditedViewModel {
    successEdition?: boolean;
    errorMessageEdition?: string;
    todo?: TodoTicketViewModel;
}
