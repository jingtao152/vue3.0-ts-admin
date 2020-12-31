import {useStore} from 'vuex'

const getters = {
    menuList: (state) => {
        if (!state.menuList || !state.menuList.length) {
            const store = useStore()
            store.dispatch('base/getMenu').then(res => {
                return state.menuList
            })
        }else {
            return state.menuList
        }

    }
}
export default getters
