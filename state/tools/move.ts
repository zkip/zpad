import { castRectShape, type RectShape } from "$core/Rectangle";
import { isHTMLElement, isFalsyExZero } from "$lib/asserts";
import { listen } from "$lib/event";
import { tryJSONParse } from "$lib/transform";
import { Vector2 } from "$lib/vector";
import { storable, viewNode } from "$state/core";
import { focusToolIndex, setFocusIndex1Side, tools } from "$state/tools";
import { getProperty, properties } from "$state/world";
import type { IEntity } from "$types/Entity";
import type { IToolAction } from "$types/tools";
import { get, writable } from "svelte/store";


export const selection = storable<Set<IEntity['id']>>('selection', {
    fallback: new Set(),
    get(value) {
        return new Set(tryJSONParse(value));
    },
    set(value) {
        return JSON.stringify(Array.from(value.values()));
    }
});

export const preview = writable<IEntity['id'] | undefined>()

export class MoveTool implements IToolAction {
    clean?: () => void;
    activating = false;
    startPosition = new Vector2();
    endPosition = new Vector2();
    initPosition = new Vector2();
    target?: string;
    activate(): void {
        this.clean?.();
        const cleanDown = listen([viewNode, 'mousedown'], (event) => {
            const picked = document.elementFromPoint(event.clientX, event.clientY);
            if (!isHTMLElement(picked)) return;
            const uid = picked.getAttribute('data-uid');
            if (isFalsyExZero(uid)) return;

            const { clientX, clientY } = event;

            this.startPosition = new Vector2(clientX, clientY);
            this.endPosition = new Vector2(clientX, clientY);
            this.initPosition = castRectShape(getProperty(uid)).position;

            this.target = uid;

            this.activating = true;
        });
        const cleanMove = listen(['mousemove'], (event) => {
            if (!this.activating) return;

            const { clientX, clientY } = event;
            this.endPosition = new Vector2(clientX, clientY)

            const uid = this.target!;
            const start = this.startPosition, end = this.endPosition, init = this.initPosition;
            const distance = new Vector2(end.x - start.x, end.y - start.y);
            const position = new Vector2(init.x + distance.x, init.y + distance.y);
            properties.update((map) => ({ ...map, [uid]: { ...map[uid], position } as RectShape }))
            this.activating = true;
        });
        const cleanUp = listen([viewNode, 'mouseup'], (event) => {
            if (!this.activating) return;

            const { clientX, clientY } = event;
            this.endPosition = new Vector2(clientX, clientY)
            const start = this.startPosition, end = this.endPosition, init = this.initPosition;
            const distance = new Vector2(end.x - start.x, end.y - start.y);
            const position = new Vector2(init.x + distance.x, init.y + distance.y);

            const uid = this.target!;
            properties.update((map) => ({ ...map, [uid]: { ...map[uid], position } as RectShape }))
            this.activating = false;
        });

        this.clean = () => { cleanDown(), cleanMove(), cleanUp() }
    }

    inactivate(): void {

        console.log('move tools inactived.');

        this.startPosition = new Vector2();
        this.endPosition = new Vector2();
        this.initPosition = new Vector2();
        this.target = undefined
        this.activating = false;
        this.clean?.();
    }

    global() {
        const cleanDown = listen([viewNode, 'mousedown'], (event) => {
            const picked = document.elementFromPoint(event.clientX, event.clientY);
            if (!isHTMLElement(picked)) return;
            const uid = picked.getAttribute('data-uid');
            // if (isFalsyExZero(uid)) return;
            selection.update(() => new Set(isFalsyExZero(uid) ? [] : [uid]));
        });

        const cleanMove = listen(['mousemove'], (event) => {
            const picked = document.elementFromPoint(event.clientX, event.clientY);
            if (!isHTMLElement(picked)) return;
            const uid = picked.getAttribute('data-uid');
            if (isFalsyExZero(uid)) return;
            preview.update(() => uid)
        });

        return () => { cleanDown(), cleanMove() }
    };
}

export function tryToActivateMoveTool() {
    const index = get(tools).findIndex((tool) => tool.type === 'move');
    setFocusIndex1Side(index < 0 ? undefined : index);
}