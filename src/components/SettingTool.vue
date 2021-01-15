<template>
    <div class="setting-tool">
        <h5>主题</h5>
        <div class="setting-group">
            <el-radio-group v-model="theme" @change="themeChange">
                <el-radio label="dark">dark</el-radio>
                <el-radio label="light">light</el-radio>
            </el-radio-group>
        </div>
        <h5>风格</h5>
        <div class="setting-group">
            <ColorSelect></ColorSelect>
        </div>
    </div>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from 'vue'
import {useStore} from 'vuex'
import ColorSelect from './coloeSelect.vue'
// 通用
const importAbout = () => {
    const store = useStore()
    return {store}
}
// 主题色
const themeEvent = (store) => {
    const defaultTheme = computed(() => {
        return store.getters['base/theme']
    })
    const theme = ref(defaultTheme.value)
    const themeChange = () => {
        store.commit('base/SET_THEME', theme.value)
    }
    return {
        theme,
        themeChange,
    }
}

export default defineComponent({
    setup() {
        const {store} = importAbout()
        const {theme, themeChange} = themeEvent(store)
        return {
            theme,
            themeChange
        }
    },
    components: {
        ColorSelect
    }
})
</script>

<style lang="scss">
.setting-tool {
    width: 100%;
    height: 100%;
    padding: 0 15px;

    .setting-group {
        padding: 15px 0;
    }
}
</style>
