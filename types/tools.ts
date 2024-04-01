export type ITool = {
    type?: string;
    icon?: string;
}

export type IToolAction = {
    activate(): void;
    inactivate(): void;
    // global action don't toggle on tools switch，and only setup once.
    // this effect has clean by cleanGlobalTool
    global?: () => () => void;
    defer?: () => void;
}

type IContext = {
    viewNode: HTMLElement;
}