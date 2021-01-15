<template>
    <div class="left-menu-wrapper" :style="{width: isCollapse ? '64px' : '200px'}">
        <el-menu
            v-if="menuList"
            :default-active="defaultActive"
            class="el-menu-vertical-demo left-menu"
            :collapse="isCollapse">
            <el-submenu :index="`${item.path}`" v-for="item in menuList" :key="item.id">
                <template #title>
                    <i :class="item.icon"></i>
                    <span>{{ item.name }}</span>
                </template>
                <el-menu-item v-for="child in item.children" :key="child.id"
                              :index="`${item.path}/${child.path}`" @click="checkItem(item, child)">
                    {{ child.name }}
                </el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script lang="ts">
import {defineComponent, computed, ref, toRefs} from 'vue'
import {useStore} from 'vuex'
import {useRouter, useRoute} from 'vue-router'

const menuGroup = (props, context) => {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const defaultActive = ref('')
    const getBread = (list, path) => {
        const paths = path.substr(1, path.length).split('/')
        const parent = list.filter(item => item.path.indexOf(paths[0]) !== -1)[0]
        const child = parent.children.filter(item => item.path === paths[1])[0]
        context.emit('checkItem', [toRefs(parent), toRefs(child)])
    }
    const menuList = computed(() => {
        const menu = store.getters['base/menuList']
        const path = route.path
        getBread(menu, path)
        defaultActive.value = path
        return menu
    })
    const checkItem = (parent, child) => {
        context.emit('checkItem', [parent, child])
        const path = `${parent.path}/${child.path}`
        store.dispatch('base/setHistoryPage', {path, pathName: child.name})
        router.push(path)
    }
    return {
        menuList,
        checkItem,
        defaultActive
    }
}

export default defineComponent({
    props: {
        isCollapse: {
            type: Boolean,
            default: true
        }
    },
    setup(props, context) {
        const {menuList, checkItem, defaultActive} = menuGroup(props, context)
        return {
            menuList,
            checkItem,
            defaultActive
        }
    }
})
</script>
<style lang="scss">
.left-menu-wrapper {
    transition: ease-in-out .3s;
    height: 100%;
    overflow: hidden;
    border-right: 1px solid #ddd;
}

.left-menu {
    transition: all .3s;
    border: none;

    .el-submenu .el-menu-item, .el-menu-item {
        min-width: unset;
        transition: all .3s;
    }
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
</style>
