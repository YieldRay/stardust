import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import stylesheet from "../stylesheet.js";

type PositionX = "left" | "center" | "right";
type PositionY = "top" | "center" | "bottom";
const isX = (str: string): str is PositionX => ["left", "right", "center"].includes(str);
const isY = (str: string): str is PositionY => ["top", "bottom", "center"].includes(str);
export type Position = "disabled" | `${PositionX}-${PositionY}` | `${PositionY}-${PositionX}`;

//? Pos is for inner use, while Position is exported
type Pos = Exclude<Position, `${PositionX}-${PositionY}`>; // "disabled" | `${PositionY}-${PositionX}`;

/**
 * A float container element with 9 optional positions
 */
@customElement("sd-float")
export class SDFloat extends LitElement {
    /**
     * floating position, if the type does not match, an error will be reported.
     * can be set to disabled or empty, at this time will cancel the floating (position: static).
     */
    @property({
        converter(value) {
            const errMsg = `The position attribute set to <sd-modal> cannot be parsed! It should be like "top-center"`;

            if (!value) return "disabled";
            if (value === "disabled") return value;

            const pos = value.split("-");
            if (pos.length != 2) throw new Error(errMsg);

            const [lhs, rhs] = pos;

            let x: PositionX, y: PositionY;

            if (isX(lhs) && isY(rhs)) (x = lhs), (y = rhs);
            else if (isY(lhs) && isX(rhs)) (x = rhs), (y = lhs);
            else throw new Error(errMsg);
            
            return `${y}-${x}`;
        },
        reflect: true,
    })
    position: Pos = "disabled";

    @property() z = "1";

    /**
     * the default is absolute positioning,
     * if this value is set to true, the fixed positioning will be performed.
     */
    @property({ type: Boolean }) fixed = false;

    static styles = [
        stylesheet,
        css`
            .container {
                position: absolute;
            }
            .disabled {
                position: static !important;
            }
            .top-left {
                top: 0;
                left: 0;
            }
            .top-center {
                top: 0;
                left: 50%;
                transform: translate(-50%, 0);
            }
            .top-right {
                top: 0;
                right: 0;
            }
            .center-left {
                top: 50%;
                left: 0;
                transform: translate(0, -50%);
            }
            .center-center {
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
            .center-right {
                top: 50%;
                right: 0;
                transform: translate(0, -50%);
            }
            .bottom-left {
                top: 100%;
                left: 0;
                transform: translate(0, -100%);
            }
            .bottom-center {
                top: 100%;
                left: 50%;
                transform: translate(-50%, -100%);
            }
            .bottom-right {
                top: 100%;
                right: 0;
                transform: translate(0, -100%);
            }
        `,
    ];

    render() {
        return html`
            <div
                class="container ${this.position}"
                style=${styleMap({
                    position: this.fixed ? "fixed" : "",
                    zIndex: this.z,
                })}
            >
                <slot></slot>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-float": SDFloat;
    }
}
