import { AsyncComponentLoader, computed, defineAsyncComponent, ref } from "vue";
import { easySpringProps, Orientation } from "./type";
import { useRoute, useRouter } from "vue-router";

const useJumpRoute = function (props: easySpringProps) {
    const routeName = ref('')
    const router = useRouter()
    const route = useRoute()
    //获取到一个路由：对象的键值对对象
    const roueMap = Object.fromEntries(
        router.getRoutes().map(route => {
            return [route.path, route]
        })
    )
    const allowMove = ref<Record<Orientation, boolean>>({
        'left': true,
        'right': true,
        'top': true,
        'bottom': true
    })
    const createDirectionComponentFunction = (direction: Orientation) => {
        return computed(() => {
            if (!routeName.value) return
            const targetPath = props.routeConfig[routeName.value]?.[direction]
            if (!targetPath) return
            if (!roueMap[targetPath as string]) return
            const components = roueMap[targetPath as string].components
            if (typeof components?.default === 'function') {
                return defineAsyncComponent({
                    loader: components?.default as AsyncComponentLoader
                })
            }
            if (typeof components?.default === 'object') {
                return components?.default
            }
            return
        })
    }
    //四个方向显示出需要使用的组件
    const topPage = createDirectionComponentFunction('top')
    const bottomPage = createDirectionComponentFunction('bottom')
    const leftPage = createDirectionComponentFunction('left')
    const rightPage = createDirectionComponentFunction('right')
    //每次路由跳转完毕都检查一下四个方向是否都允许移动
    const checkRoute = () => {
        routeName.value = route.path
        const orientations: Orientation[] = ['left', 'top', 'right', 'bottom']
        if (!routeName || !props.routeConfig[routeName.value]) {
            orientations.forEach((e) => {
                allowMove.value[e] = false
            })
            return
        }
        orientations.forEach(e => {
            allowMove.value[e] = props.routeConfig[routeName.value][e] !== null
        })
    }
    //进行路由跳转
    const routerJump = (pos: Orientation) => {
        const nextRoute = props.routeConfig[routeName.value]?.[pos]
        if (!nextRoute) return
        router.push(nextRoute)
        allowMove.value[pos] = false
        setTimeout(() => {
            checkRoute()
        }, 500);
    }
    return {
        routeName,
        route,
        router,
        allowMove,
        topPage,
        bottomPage,
        leftPage,
        rightPage,
        checkRoute,
        routerJump
    }
}
export default useJumpRoute