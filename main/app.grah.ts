import { graph, ObjectGraph, singleton } from "react-obsidian";
import { InteractorGraph } from "./interactor.graph";
import { ValidationGraph } from "./validation.graph";
import { RepositoryGraph } from "./repository.graph";
import { EntityGraph } from "./entity.graph";
import { PresenterGraph } from "./presenter.graph";

@singleton()
@graph({
    subgraphs: [
        InteractorGraph,
        ValidationGraph,
        RepositoryGraph,
        PresenterGraph,
        EntityGraph,
    ],
})
export class AppGraph extends ObjectGraph {}
