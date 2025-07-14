import { graph, ObjectGraph, singleton, provides } from "react-obsidian";
import { ILabelFactory, ITodoFactory } from "todo-entity";
import { LabelFactory, TodoFactory } from "todo-entity-default";
import "react-native-get-random-values";
@singleton()
@graph()
export class EntityGraph extends ObjectGraph {
    @provides()
    todoFactory(): ITodoFactory {
        return new TodoFactory();
    }

    @provides()
    labelFactory(): ILabelFactory {
        return new LabelFactory();
    }
}
