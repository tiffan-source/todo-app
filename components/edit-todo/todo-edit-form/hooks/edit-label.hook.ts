import { AppGraph } from "@/main/app.grah";
import { useLabelStore } from "@/store/label.store";
import { useTodoStore } from "@/store/todo.store";
import { useEffect, useState } from "react";
import { injectHook } from "react-obsidian";

const useEditLabelHook = () => {
    const allLabels = useLabelStore((state) => state.labels);

    const [labelSuggestions, setLabelSuggestions] = useState<any[]>([]);

    const [label, setLabel] = useState<string>("");

    const [tags, setTags] = useState<{ id?: string; name: string }[]>([]);

    useEffect(() => {
        let sub = useTodoStore.subscribe(
            (state) => state.todoSelectToEdit?.labels,
            (labels) => {
                if (labels) {
                    const formattedTags = labels.map((label) => ({
                        id: label.id,
                        name: label.name,
                    }));
                    setTags(formattedTags);
                } else {
                    setTags([]);
                }
            }
        );

        return () => {
            sub();
        };
    }, []);

    const handleLabelTypingInput = (text: string) => {
        setLabel(text);

        const suggestions = allLabels
            .filter(
                (l) =>
                    l.name.toLowerCase().includes(text.trim().toLowerCase()) &&
                    !tags.map((tag) => tag.name).includes(l.name)
            )
            .slice(0, 3); // Limiter à 3 suggestions

        setLabelSuggestions(suggestions);

        if (text.at(-1) === " ") {
            const newTag = text.trim();
            if (newTag && !tags.map((tag) => tag.name).includes(newTag)) {
                const formattedTag = newTag
                    .replace(/\s+/g, "")
                    .replace(/^./, (c) => c.toUpperCase());
                setTags([...tags, { name: formattedTag }]);
            }
            setLabel("");
        }
    };

    const removeTagOnPress = (index: number) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    const handleSelectSuggestion = (suggestion: {
        value: string;
        label: string;
    }) => {
        setTags([...tags, { id: suggestion.value, name: suggestion.label }]);
        setLabel("");
        setLabelSuggestions([]);
    };

    return {
        handleLabelTypingInput,
        tags,
        label,
        removeTagOnPress,
        labelSuggestions,
        handleSelectSuggestion,
    };
};

export default injectHook(useEditLabelHook, AppGraph);
