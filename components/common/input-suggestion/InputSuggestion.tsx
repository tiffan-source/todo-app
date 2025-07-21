import React, { useState } from "react";
import { Input, InputField } from "@/components/ui/input";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";

type InputSuggestionData = {
    value: string;
    label: string;
};

type InputSuggestionProps = {
    onChange: (text: string) => void;
    suggestions: InputSuggestionData[];
    value: string;
    onSelectSuggestion?: (suggestion: InputSuggestionData) => void;
    placeholder?: string;
};

const InputSuggestion = ({
    onChange,
    suggestions,
    value,
    onSelectSuggestion,
    placeholder,
}: InputSuggestionProps) => {
    const [suggestionActive, setSuggestionActive] = useState(false);

    return (
        <Box className="mb-4">
            <Input variant="underlined">
                <InputField
                    onChangeText={onChange}
                    value={value}
                    onBlur={() => setSuggestionActive(false)}
                    onFocus={() => setSuggestionActive(true)}
                    placeholder={placeholder}
                />
            </Input>
            {suggestionActive && suggestions.length > 0 && (
                <Box className="bg-white rounded-lg shadow-md">
                    {suggestions.map((suggestion, index) => (
                        <Text
                            onPress={() => onSelectSuggestion?.(suggestion)}
                            key={index}
                            className="p-2 w-full"
                        >
                            #{suggestion.label}
                        </Text>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default InputSuggestion;
