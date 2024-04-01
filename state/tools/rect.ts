import { RectShape } from "$core/Rectangle";
import { listen } from "$lib/event";
import { Vector2 } from "$lib/vector";
import { hasFocusLayer } from "$state/contextmenu";
import { inactivate } from "$state/tools";
import { createRectangle } from "$state/world";
import type { ITool, IToolAction } from "$types/tools";
import { get, writable } from "svelte/store";
import { tryToActivateMoveTool } from "./move";
import { viewNode } from "$state/core";

export const previewStart = writable<Vector2>(new Vector2());
export const previewEnd = writable<Vector2>(new Vector2());
export const previewShow = writable(false);

export class RectTool implements IToolAction {
    clean?: () => void;
    activating = false;
    defer?: (() => void) | undefined;

    constructor(defer?: () => void) { this.defer = defer }

    inactivate() {
        this.activating = false;
        previewShow.update(() => false);
        this.clean?.();
        this.defer?.();
    }

    activate(): void {
        this.clean?.();
        const cleanMousedown = listen([viewNode, 'mousedown'], (event) => {
            if (hasFocusLayer(event)) return;

            const { clientX, clientY } = event;

            previewStart.update(() => new Vector2(clientX, clientY));
            previewEnd.update(() => new Vector2(clientX, clientY));

            this.activating = true;
        });
        const cleanMousemove = listen(['mousemove'], (event) => {
            if (!this.activating) return;

            const { clientX, clientY } = event;
            previewShow.update(() => true);
            previewEnd.update(() => new Vector2(clientX, clientY));
        });
        const cleanMouseup = listen(['mouseup'], (event) => {
            if (!this.activating) return;

            const { clientX, clientY } = event;
            const mpos = new Vector2(clientX, clientY);
            const start = get(previewStart);
            const end = get(previewEnd);

            previewShow.update(() => false);
            previewEnd.update(() => mpos);

            const size = end.minus(start).abs();

            const rect = new RectShape(start, size);

            if (rect.area() > 0) {
                createRectangle(rect);
                this.inactivate();
            };

            this.activating = false;
        });
        this.clean = () => {
            cleanMousedown(), cleanMousemove(), cleanMouseup();
        };

    }
}