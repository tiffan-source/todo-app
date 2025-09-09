export const dueDateFormat = (date: Date): string => {
    let today = new Date();
    if (date.toDateString() === today.toDateString()) {
        return "Aujourd'hui";
    } else {
        return date.toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
        });
    }
};
