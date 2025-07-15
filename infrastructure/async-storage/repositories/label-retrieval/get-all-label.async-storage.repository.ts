import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    GetAllLabelRepositoryOutput,
    IGetAllLabelRepository,
} from "todo-usecase";
import { LabelRepoSaveModel } from "../common/repository.model";
import { ILabelFactory } from "todo-entity";

export class GetAllLabelAsyncStorageRepository
    implements IGetAllLabelRepository
{
    constructor(private readonly labelFactory: ILabelFactory) {}
    async execute(): Promise<GetAllLabelRepositoryOutput> {
        try {
            const jsonData = await AsyncStorage.getItem("labels");
            const labels: LabelRepoSaveModel[] = jsonData
                ? JSON.parse(jsonData)
                : [];
            const result = labels.map((label) => {
                const domainLabel = this.labelFactory.createWithId(
                    label.id,
                    label.name
                );
                domainLabel.setColor(label.color);
                return domainLabel;
            });
            return result;
        } catch (error) {
            console.error("Error fetching labels from AsyncStorage:", error);
            throw new Error("Failed to retrieve labels");
        }
    }
}
