const menuList = localStorage.LeftMenuList ?  JSON.parse(localStorage.LeftMenuList) : []

const states = {
    menuList: menuList
}
export default states
