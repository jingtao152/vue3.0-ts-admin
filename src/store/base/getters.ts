import {useStore} from 'vuex'

const getters = {
    menuList: (state) => {
        if (!state.menuList || !state.menuList.length) {
            const store = useStore()
            store.dispatch('base/getMenu').then(() => {
                return state.menuList
            })
        } else {
            return state.menuList
        }

    },
    theme: state => state.theme,
    colorStyle: state => state.colorStyle,
    historyPage: state => state.historyPage,
    token: state => state.token
}
export default getters
