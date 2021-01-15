<template>
    <div class="bread-tool">
        <div class="bread-wrapper">
      <span
          class="icon-size"
          :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
          @click="collapseMenu"
      ></span>
            <span class="el-icon-refresh-right icon-size" @click="refreshPage"></span>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>首页</el-breadcrumb-item>
                <template v-for="item in breadList">
                    <el-breadcrumb-item v-if="item.name" :key="item.id"
                    >{{ item.name }}
                    </el-breadcrumb-item>
                </template>
            </el-breadcrumb>
        </div>
        <div class="tool-wrapper">
      <span
          class="icon-size"
          :class="isFull ? 'el-icon-aim' : 'el-icon-full-screen'"
          @click="screenChange"
      ></span>
            <el-dropdown>
        <span class="el-dropdown-link">
          <el-avatar
              src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
              :size="24"
          ></el-avatar>
          <span class="user-name">admin</span>
        </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item icon="el-icon-user">个人中心</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-setting">设置</el-dropdown-item>
                        <el-dropdown-item
                            icon="el-icon-switch-button"
                            divided
                            @click="loginOut"
                        >退出登录
                        </el-dropdown-item
                        >
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            <span class="el-icon-more more" @click="openDrawer"></span>
        </div>
        <el-drawer
            title="主题风格设置"
            v-model="drawer"
            direction="rtl"
            size="280px"
            destroy-on-close
        >
            <SettingTool></SettingTool>
        </el-drawer>
    </div>
</template>

<script lang="ts">
import {defineComponent, ref, onUnmounted, onMounted} from 'vue'
import {useRouter} from 'vue-router'
import SettingTool from '../components/SettingTool.vue'
import {useStore} from 'vuex'

// 展开收起相关
const collapseEvent = (context) => {
    const collapseMenu = () => {
        context.emit('collapseMenu')
    }
    return {collapseMenu}
}
// 刷新相关
const refreshEvent = (context) => {
    const refreshPage = async () => {
        context.emit('refreshPage')
    }
    return {refreshPage}
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
        drawer.value = true
    }
    return {
        drawer,
        openDrawer,
    }
}
// 退出登录
const loginOutEvent = (store) => {
    const router = useRouter()
    const loginOut = () => {
        store.commit('base/SET_TOKEN', '')
        router.push('/login')
    }
    return {
        loginOut,
    }
}
export default defineComponent({
    props: ['breadList', 'isCollapse'],
    setup(props, context) {
        const store = useStore()
        const {collapseMenu} = collapseEvent(context)
        const {refreshPage} = refreshEvent(context)
        const {isFull, screenChange} = fulleScreen()
        const {drawer, openDrawer} = drawerEvent()
        const {loginOut} = loginOutEvent(store)
        return {
            collapseMenu,
            refreshPage,
            isFull,
            screenChange,
            drawer,
            openDrawer,
            loginOut,
        }
    },
    components: {
        SettingTool,
    },
})
</script>

<style></style>
