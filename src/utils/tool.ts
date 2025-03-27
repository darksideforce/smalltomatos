export function isEmpty(e:any){
    if(Array.isArray(e)){
        return e.length === 0
    }
    else if(typeof e === 'object' && e!== null){
        return Object.keys(e).length === 0
    }
    else if(typeof e === 'string'){
        return e.trim().length === 0
    }
    return !e
}