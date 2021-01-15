import storage from '../../hooks/storageUtil'

const states = {
    menuList: storage.getKey('menuList', []),
    theme: storage.getKey('theme', 'dark'),
    colorStyle: storage.getKey('colorStyle', '#409EFF'),
    historyPage: storage.getKey('historyPage', [{path: '/dashboard/', pathName: '主控台'}]),
    token: storage.sessionGetKey('access_token', '')
}
export default states
