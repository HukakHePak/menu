export function getComponent(children) {
    return (Array.isArray(children) && children.find((item) => typeof item === "function")) || (typeof children === "function" && children);
}