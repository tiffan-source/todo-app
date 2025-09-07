import {
    CheckLabelExistRepositoryInput,
    CheckLabelExistRepositoryOutput,
    ICheckLabelExistRepository,
} from "todo-usecase";
import { LabelRepoSaveModel } from "../common/repository.model";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class CheckLabelExistAsyncStorageRepository
    implements ICheckLabelExistRepository
{
    async checkLabelExists(
        input: CheckLabelExistRepositoryInput
    ): Promise<CheckLabelExistRepositoryOutput> {
        try {
            const existingLabels = await AsyncStorage.getItem("labels");
            const labelsArray = existingLabels
                ? JSON.parse(existingLabels)
                : [];
            return labelsArray.some(
                (label: LabelRepoSaveModel) => label.name === input
            );
        } catch (error) {
            console.error("Error checking label existence:", error);
            throw new Error("Failed to check label existence");
        }
    }
}
