import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { when } from "lit/directives/when.js";
import stylesheet from "../stylesheet.js";

// @dependency
import "./sd-transition";
import "./sd-transition-group";

/**
 * `<sd-transition>` made easy.
 * The default transition is a opacity transition,
 * and when it fade out, we make it `display: none`
 */
@customElement("sd-transition-easy")
export class SDTransitionEasy extends LitElement {
    static styles = [stylesheet, css``];

    @property() enter: Partial<CSSStyleDeclaration> = { opacity: "1" };
    @property() leave: Partial<CSSStyleDeclaration> = { opacity: "0" };
    @property() begin: Partial<CSSStyleDeclaration> = { display: "" };
    @property() end: Partial<CSSStyleDeclaration> = { display: "none" };

    /**
     * `true`  for `enter`;
     * `false` for `leave`;
     */
    @property({ type: Boolean }) state = true;

    /**
     * execute the first transition, which is not executed by default.
     */
    @property({ type: Boolean }) immediate = false;

    /**
     * use <sd-transition> (default) or <sd-transition-group>
     */
    @property({ type: Boolean }) group = false;

    /**
     * transition acts on this (`:host`) by default,
     * modify this to adjuste to act on the first child element.
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
