<template>
    <div>{{title}}</div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue'

export default defineComponent({
    setup() {
        const title = ref('conso')
        setTimeout(()=> {
            title.value = '夫是法国'
        }, 3000)
        return {
            title
        }
    }
})
</script>
