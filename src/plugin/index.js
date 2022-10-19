import mymemory from './Memory.vue'

const myPlugin = {
    install(Vue){
        Vue.component('mymemory',mymemory)
    }
}
export default myPlugin;