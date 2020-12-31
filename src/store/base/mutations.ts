import * as types from './mutation-types'

const mutations ={
    [types.SET_MENU](state, menuList){
        state.menuList = menuList
        localStorage.setItem('LeftMenuList', JSON.stringify(menuList))
    },
}
export default mutations
