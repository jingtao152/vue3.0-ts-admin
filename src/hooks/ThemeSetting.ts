import {useStore} from 'vuex'

export const ThemeSetting = (val = '') => {
    const store = useStore()
    const theme = val || store.getters['base/theme']
    const body = document.getElementsByTagName('body')
    body[0].className = `${theme}-theme`
}
