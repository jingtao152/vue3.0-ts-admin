<template>
    <router-view></router-view>
</template>
<script lang="ts">
import {defineComponent} from 'vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'

export default defineComponent({
    setup() {
        const store = useStore()
        const router = useRouter()
        store.dispatch('base/getMenu').then(() => {
            const path = location.hash.split('#')
            router.replace(path[1])
        })
    }
})
</script>
<style lang="less">
</style>
