<template>
    <div class="home">
        <LeftMenu :isCollapse="isCollapse" @checkItem="checkItem"></LeftMenu>
        <div class="app-body">
            <div class="bread-tool">
                <div class="bread-wrapper">
                      <span class="icon-size" :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
                            @click="collapseMenu"></span>
                    <span class="el-icon-refresh-right icon-size" @click="refreshPage"></span>
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item>首页</el-breadcrumb-item>
                        <template v-for="item in breadList" >
                            <el-breadcrumb-item v-if="item.name" :key="item.id">{{
                                    item.name
                                }}
                            </el-breadcrumb-item>
                        </template>
                    </el-breadcrumb>
                </div>
                <div class="tool-wrapper">
                    <span class="icon-size" :class="isFull ? 'el-icon-aim':'el-icon-full-screen'"
                          @click="screenChange"></span>
                    <el-dropdown>
                          <span class="el-dropdown-link">
                            <el-avatar src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                                       :size="24"></el-avatar>
                              <span class="user-name">admin</span>
                          </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item icon="el-icon-user">个人中心</el-dropdown-item>
                                <el-dropdown-item icon="el-icon-setting">设置</el-dropdown-item>
                                <el-dropdown-item icon="el-icon-switch-button" divided @click="loginOut">退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                    <span class="el-icon-more more" @click="openDrawer"></span>
                </div>
            </div>
            <div class="page-wrapper">
                <router-view v-if="isRouterAlive"></router-view>
            </div>
        </div>
        <el-drawer
            title="主题风格设置"
            v-model="drawer"
            direction="rtl"
            size="280px"
            destroy-on-close>
            <span>我来啦!</span>
        </el-drawer>
    </div>
</template>

<script lang="ts">
import {defineComponent, ref, nextTick, onUnmounted, onMounted} from 'vue';
import LeftMenu from '@/components/LeftMenu.vue';
import {useRouter} from "vue-router";
// 面包屑相关
const breadEvent = () => {
    const breadList = ref([])
    const checkItem = (arr) => {
        breadList.value = arr
    }
    return {breadList, checkItem}
}
// 展开收起相关
const collapseEvent = () => {
    const isCollapse = ref(false)
    const collapseMenu = () => {
        isCollapse.value = !isCollapse.value
    }
    return {isCollapse, collapseMenu}
}
// 刷新相关
const refreshEvent = () => {
    const isRouterAlive = ref(true)
    const refreshPage = async () => {
        isRouterAlive.value = false
        await nextTick()
        isRouterAlive.value = true
    }
    return {isRouterAlive, refreshPage}
}
// 全屏相关
const fulleScreen = () => {
    const isFull = ref(false)
    const screenChange = () => {
        if (isFull.value) {
            document.exitFullscreen()
        } else {
            document.documentElement.requestFullscreen()
        }
    }
    // 注册esc监听事件
    const escClick = () => {
        console.log(123)
        isFull.value = !isFull.value
    }
    onMounted(() => {
        document.addEventListener('fullscreenchange', escClick)
    })
    onUnmounted(() => {
        document.removeEventListener('fullscreenchange', escClick)
    })
    return {isFull, screenChange}
}
// 抽屉
const drawerEvent = () => {
    const drawer = ref(false)
    const openDrawer = () => {
        drawer.value =  true
    }
    return{
        drawer, openDrawer
    }
}
// 退出登录
const loginOutEvent = () => {
    const router = useRouter()
    const loginOut = () => {
        router.push('/login')
    }
    return {
        loginOut
    }
}
export default defineComponent({
    name: 'Home',
    setup() {
        const {isCollapse, collapseMenu} = collapseEvent()
        const {breadList, checkItem} = breadEvent()
        const {isRouterAlive, refreshPage} = refreshEvent()
        const {isFull, screenChange} = fulleScreen()
        const {drawer, openDrawer} = drawerEvent()
        const {loginOut} = loginOutEvent()
        return {
            isCollapse, collapseMenu,
            breadList, checkItem,
            isRouterAlive, refreshPage,
            isFull, screenChange,
            drawer, openDrawer,
            loginOut
        }
    },
    components: {
        LeftMenu
    },
});
</script>
<style lang="less">
.home {
    display: flex;
    width: 100%;
    height: 100%;

    .app-body {
        flex: 1;
        display: flex;
        flex-direction: column;
        background: #fff;

        .bread-tool {
            display: flex;
            align-items: center;
            height: 64px;
            box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
            padding: 0 24px;

            .icon-size {
                font-size: 18px;
                color: #515a6e;
                margin-right: 24px;
                cursor: pointer;
            }

            .bread-wrapper {
                flex: 1;
                display: flex;
                align-items: center;
            }

            .tool-wrapper {
                display: flex;
                align-items: center;
                .el-dropdown-link{
                    span{
                        vertical-align: middle;
                        cursor: pointer;
                    }
                    .user-name{
                        margin-left: 24px;
                    }
                }
                .more{
                    transform: rotate(90deg);
                    margin-left: 24px;
                    cursor: pointer;
                }
            }
        }

        .page-wrapper {
            flex: 1;
            padding: 20px;
        }
    }
}
</style>
