import {GetMenu} from '../../api/menu/menu'

const findIndex = (list, page) => {
    return list.findIndex(item => {
        return item.path === page.path
    })
}

const actions = {
    getMenu({commit}) {
        return GetMenu(commit)
    },
    setHistoryPage({commit, state}, page) {
        const index = findIndex(state.historyPage, page)
        if (index !== -1) return
        const newArr = state.historyPage.slice()
        newArr.push(page)
        commit('SET_HISTORY_PAGE', newArr)
    },
    closePage({commit, state}, page) {
        const index = findIndex(state.historyPage, page)
        if (index === -1) return
        const newArr = state.historyPage.slice()
        newArr.splice(index, 1)
        commit('SET_HISTORY_PAGE', newArr)
        return newArr[index] || newArr[index - 1]
    }
}
export default actions
