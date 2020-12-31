import {GetMenu} from '../../api/menu/menu'

const actions = {
    getMenu({ commit}) {
        return GetMenu(commit)
    }
}
export default actions
