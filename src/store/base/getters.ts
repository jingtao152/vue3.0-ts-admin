import {useStore} from 'vuex'

const getters = {
    menuList: (state) => {
        if (!state.menuList || !state.menuList.length) {
            const store = useStore()
            store.dispatch('base/getMenu').then(() => {
                return state.menuList
            })
        }else {
            return state.menuList
        }

    },
    theme: (state) =>{
        return state.theme
    },
    colorStyle: (state) => {
        return state.colorStyle
    },
    historyPage: state => state.historyPage
}
export default getters
