import { ipcRenderer } from 'electron';
import Store from 'electron-store';

export class StoreManager {
    private store: any
    constructor() {
        this.store = new Store({
            name: 'app-data'
        })
    }
    set(key,value){
        console.log(`key=${key}`)
        console.log(`value=${value}`)
        return this.store.set(key,value)
    }
    async get(key){
        return this.store.get(key)
    }
}