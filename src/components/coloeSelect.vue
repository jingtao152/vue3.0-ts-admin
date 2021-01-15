<template>
    <el-color-picker
        size="small"
        v-model="colorStyle"
        @change="colorChange"
    ></el-color-picker>
</template>

<script>
import {defineComponent, computed, ref, nextTick} from 'vue'
import {useStore} from 'vuex'
import {ColorStyle} from '../hooks/ColorStyle'
// 按钮风格
const colorStyleEvent = (store) => {
    const defaultColor = computed(() => {
        return store.getters['base/colorStyle']
    })
    const colorStyle = ref(defaultColor.value)
    const colorChange = () => {
        store.commit('base/SET_COLOR_STYLE', colorStyle.value)
        const {changeColor} = ColorStyle(store)
        nextTick(() => {
            changeColor()
        })
    }
    return {colorStyle, colorChange}
}
export default defineComponent({
    setup() {
        const store = useStore()
        const {colorStyle, colorChange, chalk} = colorStyleEvent(store)
        return {colorStyle, colorChange, chalk}
    },
})
</script>

<style></style>
