import * as types from './mutation-types'
import {ThemeSetting} from '../../hooks/ThemeSetting'
import storage from '../../hooks/storageUtil'

const mutations ={
    [types.SET_MENU](state, menuList){
        state.menuList = menuList
        storage.setKey('menuList', menuList)
    },
    [types.SET_THEME](state, theme){
        state.theme = theme
        storage.setKey('theme', theme)
        ThemeSetting(theme)
    },
    [types.SET_COLOR_STYLE](state, colorStyle){
        state.colorStyle = colorStyle
        storage.setKey('colorStyle', colorStyle)
    },
    [types.SET_HISTORY_PAGE](state, historyPage){
        state.historyPage = historyPage
        storage.setKey('historyPage', historyPage)
    },
}
export default mutations
