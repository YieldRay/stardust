/**
 * 注意保证泛型类型E与标签名tagName相对应，否则类型无法正确缩窄
 */
export function isTag<E extends Element>(ele: Element, tagName: string): ele is E {
    return ele.tagName.toLowerCase() === tagName;
}

export function isTarget<E extends Element>(eventTarget: Event["target"], tagName: string): eventTarget is E {
    if (!(eventTarget instanceof Element)) return false;
    return isTag<E>(eventTarget, tagName);
}

export function findInPath<E extends Element>(e: Event, isEle: (ele: Element) => ele is E): E | undefined {
    return e.composedPath().find(function (target): target is E {
        if (!Reflect.has(target, "tagName")) return false;
        return isEle(target as Element);
    });
}

export function findTagInPath<E extends Element>(e: Event, tagName: string): E | undefined {
    return findInPath(e, function (ele): ele is E {
        return isTag(ele, tagName);
    });
}

export function applyCSSStyle(ele: HTMLElement, styl?: Partial<CSSStyleDeclaration>) {
    if (!styl) return;
    for (const [k, v] of Object.entries(styl)) {
        Reflect.set(ele.style, k, v);
    }
}
