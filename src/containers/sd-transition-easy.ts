import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { when } from "lit/directives/when.js";
import stylesheet from "../stylesheet.js";

import "./sd-transition";

/**
 *  <sd-transition> made easy
 * the default transition is a opacity transition
 * which can used for fading in/out
 */
@customElement("sd-transition-easy")
export class SDTransitionEasy extends LitElement {
    static styles = [stylesheet, css``];

    @property() enter: Partial<CSSStyleDeclaration> = { opacity: "1" };
    @property() leave: Partial<CSSStyleDeclaration> = { opacity: "0" };
    @property() begin: Partial<CSSStyleDeclaration> = { display: "" };
    @property() end: Partial<CSSStyleDeclaration> = { display: "none" };
    /**
     * `true`  则为 enter；
     * `false` 则为 leave；
     */
    @property({ type: Boolean }) state = true;

    /**
     * 是否执行第一次过渡，默认不执行
     */
    @property({ type: Boolean }) immediate = false;

    /**
     * 是否使用 <sd-transition-group>
     */
    @property({ type: Boolean }) group = false;
    /**
     * 是否作用到第一个子元素上，一般使用唯一子元素时才有用
     */
    @property({ type: Boolean, attribute: "apply-to-first-element" }) applyToFirstElement = false;

    render() {
        return html`
            ${when(
                this.group,
                () => html`
                    <sd-transition-group .from=${this.leave} .to=${this.enter} .immediate=${this.immediate}>
                        <slot></slot>
                    </sd-transition-group>
                `,
                () => html`
                    <sd-transition
                        .enter=${{
                            begin: this.begin,
                            from: this.leave,
                            to: this.enter,
                        }}
                        .leave=${{
                            from: this.enter,
                            to: this.leave,
                            end: this.end,
                        }}
                        .state=${this.state}
                        .immediate=${this.immediate}
                        .applyToFirstElement=${this.applyToFirstElement}
                    >
                        <slot></slot>
                    </sd-transition>
                `
            )}
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "sd-transition-easy": SDTransitionEasy;
    }
}
