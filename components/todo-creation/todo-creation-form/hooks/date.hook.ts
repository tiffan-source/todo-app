import { use, useState } from "react";

export const useDateHook = () => {
    const [date, setDate] = useState<Date | undefined>(undefined);

    return {
        date,
        setDate,
    };
};
