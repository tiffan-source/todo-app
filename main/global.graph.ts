import { graph, ObjectGraph, singleton } from "react-obsidian";
import { TodoCreationGraph } from "./todo-creation/todo-creation.graph";
import { TodoRetrievalGraph } from "./todo-retrieval/todo-retrieval.graph";
import { TodoModificationGraph } from "./todo-modification/todo-modificaton.graph";

@singleton()
@graph({
    subgraphs: [TodoCreationGraph, TodoRetrievalGraph, TodoModificationGraph],
})
export class GlobalGraph extends ObjectGraph {
    // This is a placeholder for the global graph.
    // You can add global dependencies or services here that are needed across the application.
}
