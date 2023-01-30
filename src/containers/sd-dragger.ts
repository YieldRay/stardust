import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import stylesheet from "../stylesheet.js";
import { cssPercentage } from "../utils.js";

/**
 * You can manually place the host element just by css property `left` `right` `top` `bottom`
 * Adding dataset `data-draggable` to make the target element to be a draggable area.
 * Notice: `data-draggable` work only for direct children
 * @example
 * ```html
 *  <sd-window style="left:50%;top:50%">
 *      <div data-draggable> title (draggable) </div>
 *      <div> CONTENT (not draggable) </div>
 *  </sd-window>
 * ```
 */

@customElement("sd-dragger")
export class SDDragger extends LitElement {
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

    /**
     * Use `%` rather than `px`, which can simply avoid the host element's
     * moving outside the document when the window size reduced
     * */
    @property({ type: Boolean }) percentage: Boolean = false;

    private _handleSlotChange(e: Event) {
        const slot = e.target as HTMLSlotElement;

        const needDraggable: HTMLElement[] = (
            slot.assignedElements({ flatten: true }).filter((e) => e instanceof HTMLElement) as HTMLElement[]
        ).filter((e) => e.dataset.draggable !== undefined);

        needDraggable.forEach((e) => this._makeDraggable(this, e));
    }

    private _makeDraggable(hostEle: HTMLElement, targetEle: HTMLElement) {
        targetEle.style.cursor = "move";
        targetEle.style.userSelect = "none";
        targetEle.style.touchAction = "none";

        targetEle.addEventListener("pointerdown", (event) => {
            targetEle.setPointerCapture(event.pointerId);

            // record initial pointer shift
            const rect = targetEle.getBoundingClientRect();
            const shiftX = event.clientX - rect.x;
            const shiftY = event.clientY - rect.y;

            const onPointerMove = (event: PointerEvent) => {
                const pointerX = event.clientX;
                const pointerY = event.clientY;
                const left = pointerX - shiftX;
                const top = pointerY - shiftY;
                if (this.percentage) {
                    hostEle.style.left = cssPercentage(left, document.documentElement.clientWidth);
                    hostEle.style.top = cssPercentage(top, document.documentElement.clientHeight);
                    hostEle.style.bottom = "";
                    hostEle.style.right = "";
                } else {
                    hostEle.style.left = left + "px";
                    hostEle.style.top = top + "px";
                }
                // prevent moving element outside the window
                const rect = hostEle.getBoundingClientRect();
                if (hostEle.offsetLeft <= 0) hostEle.style.left = "0px";
                if (rect.top <= 0) hostEle.style.top = "0px";
                if (rect.right >= window.innerWidth) hostEle.style.left = window.innerWidth - rect.width + "px";
                if (rect.bottom >= window.innerHeight) hostEle.style.top = window.innerHeight - rect.height + "px";
            };

            targetEle.addEventListener("pointermove", onPointerMove);
            const cancelListener = () => targetEle.removeEventListener("pointermove", onPointerMove);
            targetEle.addEventListener("pointercancel", cancelListener);
            targetEle.addEventListener("pointerup", cancelListener);
        });
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-dragger": SDDragger;
    }
}
