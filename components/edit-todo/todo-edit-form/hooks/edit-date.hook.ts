import { useTodoStore } from "@/store/todo.store";
import { useEffect, useState } from "react";

export const useEditDateHook = () => {
    const [date, setDate] = useState<Date | undefined>(undefined);

    useEffect(() => {
        let sub = useTodoStore.subscribe(
            (state) => state.todoSelectToEdit?.dueDate,
            (dueDate) => {
                if (dueDate) {
                    let date = new Date(dueDate);
                    setDate(date);
                } else {
                    setDate(undefined);
                }
            }
        );

        return () => {
            sub();
        };
    }, []);

    return {
        date,
        setDate,
    };
};
