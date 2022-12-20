import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { when } from "lit/directives/when.js";
import stylesheet from "../stylesheet.js";

import "./sd-transition";

/**
 * A tree element for displaying recursive content
 * @example
 * ```html
 *  <sd-tree node="NODENAME IN ATTRIBUTE" has-child>
 *      <span slot="node">NODENAME IN HTML (will override attribute) </span>
 *      <sd-tree node="subtree" has-child>
 *          <sd-tree node="111"></sd-tree>
 *          <sd-tree node="222"></sd-tree>
 *      </sd-tree>
 *  </sd-tree>
 * ```
 */
@customElement("sd-tree")
export class SDTree extends LitElement {
    /** whether the element has child nodes */
    @property({ type: Boolean, attribute: "has-child" }) hasChild = false;

    /**
     *  the content of this node (can only be text).
     *  `slot=node` slot should be used if HTML needs to be rendered.
     */
    @property() node = "";

    /** whether the tree is expanded */
    @property({ type: Boolean }) expand = false;

    static styles = [
        stylesheet,
        css`
            .node {
                cursor: pointer;
                display: flex;
                align-items: center;
            }
            .node:hover {
                background-color: var(--sd-color-shadow);
            }

            .subtree {
                margin-left: 1em;
            }
            .toggle {
                width: 1em;
            }
            .triangle {
                --triangle-size: 0.25em;
                transition: all var(--sd-time-fast);
                transform: rotate(-90deg);
            }
        `,
    ];

    render() {
        return html`
            <div class="node" @click=${this._handleClick}>
                <div class="toggle">
                    ${when(
                        this.hasChild,
                        () => html`
                            <slot name="toggle">
                                <div
                                    class="triangle"
                                    style=${styleMap({ transform: this.expand ? "rotate(0)" : "" })}
                                ></div>
                            </slot>
                        `
                    )}
                </div>
                <div><slot name="node">${this.node}</slot></div>
            </div>

            <sd-transition-easy
                .enter=${{ transform: "translateY(0)", opacity: "1" }}
                .leave=${{ transform: "translateY(-.25em)", opacity: "0" }}
                .begin=${{ display: "block", transformOrigin: "0 0" }}
                .end=${{ display: "none" }}
                .state=${this.expand}
            >
                <div class="subtree">
                    <slot></slot>
                </div>
            </sd-transition-easy>
        `;
    }

    private _handleClick() {
        this.expand = !this.expand;
        this.dispatchEvent(new CustomEvent<{ expand: boolean }>("change", { detail: { expand: this.expand } }));
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-tree": SDTree;
    }
}
