import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import stylesheet from "../stylesheet.js";

/**
 * A window container that has a fixed position.
 * You can place the window by add style to the host element.
 * Adding dataset `data-draggable` to make the target element to be a draggabe area.
 * @example
 * ```html
 *  <sd-window style="left:50%;top:50%">
 *      <div data-draggable> title (draggable) </div>
 *      <div> CONTENT (not draggable) </div>
 *  </sd-window>
 * ```
 */

@customElement("sd-window")
export class SDWindow extends LitElement {
    @state() listenerRefs: Array<() => void> = [];
    static styles = [
        stylesheet,
        css`
            :host {
                display: inline-block;
                position: fixed;
                left: 0;
                top: 0;
                z-index: 1;
            }
        `,
    ];

    render() {
        return html`<slot @slotchange=${this._handleSlotChange}></slot>`;
    }

    private _handleSlotChange(e: Event) {
        this._cancelListeners();

        const slot = e.target as HTMLSlotElement;

        const needDraggable: HTMLElement[] = (
            slot.assignedElements({ flatten: true }).filter((e) => e instanceof HTMLElement) as HTMLElement[]
        ).filter((e) => e.dataset.draggable !== undefined);

        needDraggable.forEach((e) => this._makeDraggable(this, e));
    }

    disconnectedCallback() {
        this._cancelListeners();
    }

    private _makeDraggable(windowEle: HTMLElement, targetEle: HTMLElement) {
        targetEle.style.cursor = "move";
        targetEle.style.userSelect = "none";

        targetEle.addEventListener("mousedown", (event) => {
            targetEle.ondragstart = () => false;

            const rect = targetEle.getBoundingClientRect();
            const shiftX = event.clientX - rect.x;
            const shiftY = event.clientY - rect.y;
            // move windowEle to page coordinate
            function moveAt(pageX: number, pageY: number) {
                const left = pageX - shiftX;
                const top = pageY - shiftY;
                windowEle.style.left = left + "px";
                windowEle.style.top = top + "px";
                // prevent moving element outside the window
                const rect = windowEle.getBoundingClientRect();
                if (windowEle.offsetLeft <= 0) windowEle.style.left = "0px";
                if (rect.top <= 0) windowEle.style.top = "0px";
                if (rect.right >= window.innerWidth) windowEle.style.left = window.innerWidth - rect.width + "px";
                if (rect.bottom >= window.innerHeight) windowEle.style.top = window.innerHeight - rect.height + "px";
            }
            const onMouseMove = (event: MouseEvent) => moveAt(event.clientX, event.clientY);
            document.addEventListener("mousemove", onMouseMove);
            const onMouseUp = () => document.removeEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
            // here only keep record of onmouseup,
            // as normally onmouseup will be triggered and onmousemove will stop listening
            this.listenerRefs.push(onMouseUp);
        });
    }

    private _cancelListeners() {
        if (this.listenerRefs.length === 0) return;
        this.listenerRefs.forEach((l) => document.removeEventListener("mouseup", l));
        this.listenerRefs = []; // trigger GC
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-window": SDWindow;
    }
}
