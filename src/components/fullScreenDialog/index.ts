import { app } from "electron"
import { AppContext, Component, ComponentPublicInstance, createVNode, getCurrentInstance, render, VNode } from "vue"
interface options {
    visible?: boolean,
    onClose?: () => void,
    appendTo?: HTMLElement | string,
    slot?: Record<string, () => VNode> | VNode[]
    [key: string]: unknown
}
const getAppendTo = (props: options): HTMLElement => {
    let appendTo: HTMLElement | null = document.body
    if (props.appendTo) {
        if (typeof props.appendTo === 'string') {
            appendTo = document.querySelector<HTMLElement>(props.appendTo)
        }
        if (props.appendTo instanceof HTMLElement) {
            appendTo = props.appendTo;
        }
        if (!(appendTo instanceof HTMLElement)) {
            appendTo = document.body;
        }
    }
    return appendTo
}
const initInstance = <T extends Component>(
    props: options,
    context: AppContext | null = null,
    component: T,
    container: HTMLElement,
    slot?: Record<string, () => VNode> | VNode[]) => {
    let slotVNode;
    if (slot) {
        slotVNode = {
            default: () => [createVNode(slot)]
        };
    } else {
        slotVNode = {};
    }
    const vNode = createVNode(component, props, slotVNode)
    vNode.appContext = context
    render(vNode, container)
    getAppendTo(props).appendChild(container)
    return vNode
}

const useDialog = <T extends Component>(component: T) => {
    const appContext = getCurrentInstance()?.appContext
    const container = document.createElement('div')
    const close = () => {
        console.log(`close`)
        render(null, container)
        container.parentNode?.removeChild(container)
    }
    const componentCommond = (options: options) => {
        const { slot } = options
        if (typeof options.onClose !== 'function') {
            options.onClose = close
        }
        else {
            const originClose = options.onClose
            options.onClose = () => {
                originClose()
                close()
            }
        }
        const vNode = initInstance(options, appContext, component, container, slot)
        const vm = vNode.component?.proxy as ComponentPublicInstance<options>
        for (const props in options) {
            if (Reflect.has(options, props) && !Reflect.has(vm.$props, props)) {
                vm[props] = options[props]
            }
        }
        return vNode
    }
    componentCommond.close = close
    return componentCommond
}
export default useDialog