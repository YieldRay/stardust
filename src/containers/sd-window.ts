import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import stylesheet from "../stylesheet.js";

/**
 * A window container that has a fixed position.
 * You can place the window by add style to the host element.
 * Adding dataset `data-draggable` to make the target element to be a draggabe area.
 * Notice: `data-draggable` work only for direct children
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
        const slot = e.target as HTMLSlotElement;

        const needDraggable: HTMLElement[] = (
            slot.assignedElements({ flatten: true }).filter((e) => e instanceof HTMLElement) as HTMLElement[]
        ).filter((e) => e.dataset.draggable !== undefined);

        needDraggable.forEach((e) => this._makeDraggable(this, e));
    }

    private _makeDraggable(windowEle: HTMLElement, targetEle: HTMLElement) {
        targetEle.style.cursor = "move";
        targetEle.style.userSelect = "none";
        targetEle.style.touchAction = "none";

        targetEle.addEventListener("pointerdown", (event) => {
            targetEle.setPointerCapture(event.pointerId);

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
            const onPointerMove = (event: PointerEvent) => moveAt(event.clientX, event.clientY);
            targetEle.addEventListener("pointermove", onPointerMove);
            const cancelListener = () => targetEle.removeEventListener("pointermove", onPointerMove);
            targetEle.addEventListener("pointercancel", cancelListener);
            targetEle.addEventListener("pointerup", cancelListener);
        });
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-window": SDWindow;
    }
}
