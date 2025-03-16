import { RouteLocationRaw } from "vue-router"

export interface RouteConfig  {
    left?:RouteLocationRaw |null ,
    right?:RouteLocationRaw |null ,
    top?:RouteLocationRaw |null
    bottom?:RouteLocationRaw |null
}
export type DragEventFunc <T extends TouchEvent | MouseEvent> = (e: T) => void
export type animeName  = "fadeIn" | "fadeOut" | "slideUp" | "slideDown" | "slideLeft" | "slideRight"
export type Direction = "horizontal" | "vertical" | null
export type Orientation = 'left' | 'right' | 'top' | 'bottom'
export type Axis = "x" | "y"
export type Vector2D = { x:number,y:number}
export interface easySpringProps{
    routeConfig:Record<string, RouteConfig>
  }
