<template>
    <div
        class="ValidCode disabled-select"
        :style="`width:${width}; height:${height}`"
        @click="createdCode"
    >
    <span
        v-for="(item, index) in codeList"
        :key="index"
        :style="getStyle(item)"
    >{{ item.code }}</span
    >
    </div>
</template>

<script>
import {defineComponent, onMounted, ref} from 'vue'

export default defineComponent({
    props: {
        width: {
            type: String,
            default: '100px',
        },
        height: {
            type: String,
            default: '40px',
        },
        length: {
            type: Number,
            default: 4,
        },
    },
    setup(props, context) {
        const codeList = ref([])
        const createdCode = () => {
            const len = props.length,
                codeArr = [],
                chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz0123456789',
                charsLen = chars.length
            // 生成
            for (let i = 0; i < len; i++) {
                const rgb = [
                    Math.round(Math.random() * 220),
                    Math.round(Math.random() * 240),
                    Math.round(Math.random() * 200),
                ]
                codeArr.push({
                    code: chars.charAt(Math.floor(Math.random() * charsLen)),
                    color: `rgb(${rgb})`,
                    fontSize: `1${[Math.floor(Math.random() * 10)]}px`,
                    padding: `${[Math.floor(Math.random() * 10)]}px`,
                    transform: `rotate(${Math.floor(Math.random() * 90) -
                    Math.floor(Math.random() * 90)}deg)`,
                })
            }
            codeList.value = codeArr
            context.emit('update:modelValue', codeArr.map((item) => item.code).join(''))

        }
        const getStyle = (data) => {
            return `color: ${data.color}; font-size: ${data.fontSize}; padding: ${data.padding}; transform: ${data.transform}`
        }
        const refresh = () => {
            createdCode()
        }
        onMounted(() => {
            createdCode()
        })
        return {codeList, getStyle, createdCode, refresh}
    },
})
</script>

<style lang="scss">
.ValidCode {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    span {
        display: inline-block;
    }

    &::after {
        content: '';
        width: 100%;
        height: 100%;
        background: url('../assets/codeBack.jpg') 100% 100%;
        opacity: 0.2;
        position: absolute;
        border-radius: 4px;
    }
}
</style>
