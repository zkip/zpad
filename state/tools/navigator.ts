import type { IToolAction } from "$types/tools";


export class NavigatorTool implements IToolAction {
    clean?: () => void;
    activate(): void {

    }

    inactivate(): void {

    }

    global() {

        return () => { }
    };
}
