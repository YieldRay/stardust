import { LitElement, css, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";

@customElement("sd-menu")
export class SDMenu extends LitElement {
    @property({ type: Boolean })
    hidden = false;

    static styles = css`
        :host {
            display: inline-block;
        }
        #body {
            position: relative;
        }
        #menu {
            position: absolute;
        }
    `;

    @query("#body")
    body!: HTMLDivElement;

    @query("#menu")
    menu!: HTMLDivElement;

    render() {
        return html`
            <div id="body">
                <slot></slot>
                <div id="menu">
                    <slot name="menu"> </slot>
                </div>
            </div>
        `;
    }

    /**
     * 调用此方法重新计算并设置菜单位置
     */
    public calcPos() {
        const { body, menu } = this;
        const bodyRect = body.getBoundingClientRect();

        if (bodyRect.top > window.innerHeight - bodyRect.bottom) {
            // top
            menu.style.top = "";
            menu.style.bottom = "100%";
        } else {
            // bottom
            menu.style.top = "100%";
            menu.style.bottom = "";
        }
        if (bodyRect.left > window.innerWidth - bodyRect.left) {
            // left
            menu.style.left = "";
            menu.style.right = "0px";
        } else {
            // right
            menu.style.left = "0px";
            menu.style.right = "";
        }
    }

    updated() {
        this.calcPos();
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-menu": SDMenu;
    }
}
