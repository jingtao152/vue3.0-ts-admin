import router from './index'

export const initRoute = (list, newArr) => {

    list.forEach(item => {
        if (item.component) {
            let child = []
            if (item.children) {
                child = initRoute(item.children, [])
            }
            newArr.push({
                path: item.path,
                name: item.name,
                children: child,
                component: () => import(`../views/${item.component}`)
            })
        }

    })
    return newArr
}
export const addRouter = (list) => {
    const routes = initRoute(list, [])
    router.addRoute('', {
        path: '/',
        name: 'home',
        component: () => import('../views/Home.vue'),
        children: routes,
        redirect: '/dashboard/',
    })
}


