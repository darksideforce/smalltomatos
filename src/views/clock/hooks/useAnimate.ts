import { onBeforeUnmount, onMounted, ref } from "vue"
import Matter, { Engine, Render, Bodies, World, Runner, IEventCollision } from 'matter-js';

const imageurl = new URL('./tomatos.png',import.meta.url)
const useAnimateHooks = function () {
    const engine = ref<Matter.Engine | null>(null)
    const render = ref<Matter.Render | null>(null)
    const tomatoes = ref<Matter.Body[]>([])
    const container = ref<HTMLElement | null>(null)
    const timer = ref<NodeJS.Timeout | null>(null)
    const runner = ref<Matter.Runner | null>(null)
    const registerContainer = (ele: HTMLElement | null) => {
        container.value = ele
        initEngine()
    }
    const initEngine = () => {
        if (container.value) {
            console.log(container.value.offsetWidth)
            engine.value = Engine.create()
            runner.value = Runner.create()
            render.value = Render.create({
                element: container.value,
                engine: engine.value,
                options: {
                    width: container.value.offsetWidth,
                    height: container.value.offsetHeight,
                    wireframes: false 
                }
            })
            World.add(engine.value.world, [
                Bodies.rectangle(container.value.offsetWidth / 2, container.value.offsetHeight, container.value.offsetWidth, 50, {
                    isStatic: true,
                    render: { 
                        fillStyle: '#eeeeee' ,
                    }
                })
            ])
            Render.run(render.value)
            // Engine.run(render.value)
            renderImg()
        }

    }
    const createTomatoes = (): Matter.Body => {
        const width: number = container.value?.offsetWidth ? container.value.offsetWidth : 20
        const position = Math.random() * width
        console.log(`postition=${position}`)
        return Bodies.circle(
            position,
            50,
            25,
            {
                restitution: 0.8,
                render: {
                    sprite:{
                        texture:imageurl.href,
                        xScale:0.1,
                        yScale:0.1
                    }
                },
                label: 'tomato' // 标记为番茄类型
            }
        );
    }
    const renderImg = () => {
        const image = new Image ()

        image.src = imageurl.href
        image.onload=()=>{
            console.log(`画完`)
            if (!engine.value || !runner.value) return;
            timer.value = setInterval(() => {
                if (!engine.value) return;
                const tomato = createTomatoes();
                World.add(engine.value.world, tomato);
                tomatoes.value.push(tomato);
    
            }, 500);
            Runner.run(runner.value, engine.value)
        }



    }
    const destoryRuner = () => {
        if (engine.value && render.value) {
            Runner.stop(runner.value!);
            Render.stop(render.value);
            World.clear(engine.value.world, false);
            Engine.clear(engine.value);
            if (timer.value) clearInterval(timer.value);
        }
    }
    onBeforeUnmount(() => {
        destoryRuner()
    })
    return {
        registerContainer,
        renderImg
    }
}
export default useAnimateHooks