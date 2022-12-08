import { LitElement, css, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";

/**
 * @slot - 默认插槽
 * @slot float - 悬浮的元素，位置相对默认插槽自动计算
 */
@customElement("sd-float")
export class SDFloat extends LitElement {
    @property({ type: Boolean }) hidden = false;

    static styles = css`
        :host {
            display: inline-block;
        }
        #body {
            position: relative;
            max-width: 100vw;
            max-height: 100vh;
        }
        #float {
            position: absolute;
            transition: all var(--sd-time-normal);
        }
    `;

    @query("#body") private body!: HTMLDivElement;

    @query("#float") private float!: HTMLDivElement;

    render() {
        return html`
            <div id="body">
                <slot @slotchange=${() => this.calculatePosition()}></slot>
                <div id="float">
                    <slot name="float" @slotchange=${() => this.calculatePosition()}> </slot>
                </div>
            </div>
        `;
    }

    /**
     * 调用此方法重新计算并设置菜单位置
     */
    public calculatePosition() {
        const { body, float } = this;
        const bodyRect = body.getBoundingClientRect();

        if (bodyRect.top > window.innerHeight - bodyRect.bottom) {
            // top
            float.style.top = "";
            float.style.bottom = "100%";
        } else {
            // bottom
            float.style.top = "100%";
            float.style.bottom = "";
        }
        if (bodyRect.left > window.innerWidth - bodyRect.left) {
            // left
            float.style.left = "";
            float.style.right = "0px";
        } else {
            // right
            float.style.left = "0px";
            float.style.right = "";
        }
    }

    protected updated() {
        this.calculatePosition();
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-float": SDFloat;
    }
}
