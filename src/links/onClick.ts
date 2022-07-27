export function openTab(url: string) {
    return () => window.open(url, "_blank")
}
export function onClick(component: Element | null, url: string) {
    if (component) component.addEventListener('click', openTab(url))
}