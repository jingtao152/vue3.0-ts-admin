<template>
    <div class="pageFull">
        {{ title }}
        <el-button type="primary" @click="addPath">按钮</el-button>
    </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue'
import {useStore} from 'vuex'

export default defineComponent({
    setup() {
        const title = ref('conso')
        const store = useStore()
        setTimeout(() => {
            title.value = '夫是法国'
        }, 3000)
        const name = ref(0)
        const addPath = () => {
            name.value++
            const data = {
                path: '/asf/' + new Date().getTime(),
                pathName: name.value.toString()
            }
            store.dispatch('base/setHistoryPage', data)
        }
        return {
            title,
            addPath
        }
    }
})
</script>
<style lang="scss">
.pageFull {
    height: 100%;
    width: 100%;
}
</style>
