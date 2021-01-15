<template>
    <div class="history-page">
        <i
            v-if="showPageBtn"
            class="el-icon-arrow-left scroll-icon"
            @click="pageTo('Prev')"
        ></i>
        <div class="scroll-wrapper" ref="scroll">
            <router-link
                :to="item.path"
                class="page-item"
                v-for="(item, index) in historyList"
                :key="index"
            >
        <span class="item-title" :class="{ active: item.path === routePath }">{{
                item.pathName
            }}</span>
                <span
                    v-if="item.path !== '/dashboard/'"
                    class="icon-wraperr"
                    @click.stop.prevent="closePage(item)"
                >
          <i class="el-icon-close"></i>
        </span>
            </router-link>
        </div>
        <i
            v-if="showPageBtn"
            class="el-icon-arrow-right scroll-icon"
            @click="pageTo('Next')"
        ></i>
    </div>
</template>

<script lang="ts">
import {computed, defineComponent, watch, ref, nextTick} from 'vue'
import {useStore} from 'vuex'
import {useRoute, useRouter} from 'vue-router'
// 标签点击， 跳转相关
const tagEvent = (getScrollWidth, scrollToView) => {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const routePath = ref(route.path)
    const historyList = computed(() => {
        return store.getters['base/historyPage']
    })
    // 关闭标签，如果关闭当前页， 则跳转到下一页
    const closePage = (item) => {
        store.dispatch('base/closePage', item).then((res) => {
            if (item.path === routePath.value) {
                router.push(res.path)
            }
        })
    }

    // 监听路由变化
    watch(
        () => [route.path, historyList.value],
        () => {
            routePath.value = route.path
            const index = historyList.value.findIndex(
                (item) => item.path === routePath.value
            )
            scrollToView(index)
            getScrollWidth()
        }
    )
    return {
        historyList,
        closePage,
        routePath,
    }
}
const pageToEvent = () => {
    const scroll = ref<HTMLElement | null>(null)
    const showPageBtn = ref(false)

    const pageTo = (to) => {
        if (scroll.value) {
            const clientWidth = scroll.value.clientWidth
            const scrollLeft = scroll.value.scrollLeft
            const scrollWidth = scroll.value.scrollWidth
            // 下一页
            if (to === 'Next') {
                let scrollX = scrollLeft + clientWidth - 20
                if (scrollX > scrollWidth) {
                    scrollX = scrollWidth
                }
                scroll.value.scrollTo({
                    left: scrollX,
                    behavior: 'smooth',
                })
            }
            // 上一页
            if (to === 'Prev') {
                let scrollX = scrollLeft - clientWidth + 20
                if (scrollX < 0) {
                    scrollX = 0
                }
                scroll.value.scrollTo({
                    left: scrollX,
                    behavior: 'smooth',
                })
            }
        }
    }
    const scrollToView = (index) => {
        if (scroll.value && index !== -1) {
            const viewChild = scroll.value.children[index] as HTMLElement
            const parentOffsetWidth = scroll.value.offsetLeft
            const left = viewChild.offsetLeft - parentOffsetWidth
            scroll.value.scrollTo({
                left: left,
                behavior: 'smooth',
            })
        }
    }
    const getScrollWidth = () => {
        nextTick(() => {
            if (scroll.value) {
                showPageBtn.value = scroll.value.scrollWidth > scroll.value.clientWidth
            }
        })
    }

    getScrollWidth()
    return {scroll, pageTo, showPageBtn, getScrollWidth, scrollToView}
}
export default defineComponent({
    setup() {
        const {
            scroll,
            pageTo,
            showPageBtn,
            getScrollWidth,
            scrollToView,
        } = pageToEvent()

        const {historyList, closePage, routePath} = tagEvent(
            getScrollWidth,
            scrollToView
        )
        return {
            historyList,
            closePage,
            routePath,
            pageTo,
            scroll,
            showPageBtn,
        }
    },
})
</script>

<style lang="scss">
.history-page {
    padding: 6px 12px;
    height: 44px;
    width: 100%;
    white-space: nowrap;
    display: flex;
    overflow: hidden;

    .scroll-wrapper {
        width: 20px;
        flex: 1;
        overflow: hidden;

        .page-item {
            display: inline-flex;
            align-items: center;
            height: 32px;
            border-radius: 3px;
            border: none;
            margin-right: 6px;
            padding: 0 16px;
            color: #808695;
            background: #fff;
            cursor: pointer;
            text-decoration: none;

            .icon-wraperr {
                display: inline-block;
                text-align: center;
                line-height: 22px;
                width: 22px;
                height: 22px;
                margin-right: -6px;
            }

            .active {
                color: #2d8cf0;
            }
        }
    }

    .scroll-icon::before {
        display: inline-block;
        width: 22px;
        height: 22px;
        text-align: center;
        line-height: 22px;
        margin-top: 5px;
        cursor: pointer;
    }
}
</style>
