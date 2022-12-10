export function findInPath<E extends Element>(e: Event, isEle: (ele: Element) => ele is E): E | undefined {
    if (!Reflect.has(e, "path")) return;
    return e.composedPath().find(function (target): target is E {
        if (!Reflect.has(target, "tagName")) return false;
        return isEle(target as Element);
    });
}

/**
 * 注意保证泛型类型E与标签名tagName相对应，否则类型无法正确缩窄
 */
export function isTag<E extends Element>(ele: Element, tagName: string): ele is E {
    return ele.tagName.toLowerCase() === tagName;
}

export function findTagInPath<E extends Element>(e: Event, tagName: string): E | undefined {
    return findInPath(e, function (ele): ele is E {
        return isTag(ele, tagName);
    });
}
