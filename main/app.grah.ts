import { graph, ObjectGraph, singleton } from "react-obsidian";
import { ControllerGraph } from "./controller.graph";
import { InteractorGraph } from "./interactor.graph";
import { ValidationGraph } from "./validation.graph";
import { RepositoryGraph } from "./repository.graph";
import { PresenterGraph } from "./presenter.graph";
import { EntityGraph } from "./entity.graph";

@singleton()
@graph({
    subgraphs: [
        ControllerGraph,
        InteractorGraph,
        ValidationGraph,
        RepositoryGraph,
        PresenterGraph,
        EntityGraph,
    ],
})
export class AppGraph extends ObjectGraph {}
