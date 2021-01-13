<template>
  <div class="home">
    <LeftMenu :isCollapse="isCollapse" @checkItem="checkItem"></LeftMenu>
    <div class="app-body">
      <HeaderMenu
        :isCollapse="isCollapse"
        :breadList="breadList"
        @collapseMenu="collapseMenu"
        @refreshPage="refreshPage"
      ></HeaderMenu>
      <HistoryPage></HistoryPage>
      <div class="page-wrapper">
        <router-view v-if="isRouterAlive"></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick } from 'vue'
import LeftMenu from '@/components/LeftMenu.vue'
import HeaderMenu from '../components/HeaderMenu.vue'
import HistoryPage from '../components/HistoryPage.vue'
// 面包屑相关
const breadEvent = () => {
  const breadList = ref([])
  const checkItem = (arr) => {
    breadList.value = arr
  }
  return { breadList, checkItem }
}
// 刷新相关
const refreshEvent = () => {
  const isRouterAlive = ref(true)
  const refreshPage = async () => {
    isRouterAlive.value = false
    await nextTick()
    isRouterAlive.value = true
  }
  return { isRouterAlive, refreshPage }
}
// 展开收起相关
const collapseEvent = () => {
  const isCollapse = ref(false)
  const collapseMenu = () => {
    isCollapse.value = !isCollapse.value
  }
  return { isCollapse, collapseMenu }
}
export default defineComponent({
  name: 'Home',
  setup() {
    const { breadList, checkItem } = breadEvent()
    const { isRouterAlive, refreshPage } = refreshEvent()
    const { isCollapse, collapseMenu } = collapseEvent()
    return {
      isRouterAlive,
      refreshPage,
      breadList,
      checkItem,
      isCollapse,
      collapseMenu,
    }
  },
  components: {
    LeftMenu,
    HeaderMenu,
    HistoryPage,
  },
})
</script>
<style lang="scss">
.home {
  display: flex;
  width: 100%;
  height: 100%;

  .app-body {
    flex: 1;
    display: flex;
    flex-direction: column;

    .bread-tool {
      display: flex;
      align-items: center;
      height: 64px;
      box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
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
        .el-dropdown-link {
          span {
            vertical-align: middle;
            cursor: pointer;
          }
          .user-name {
            margin-left: 12px;
          }
        }
        .more {
          transform: rotate(90deg);
          margin-left: 24px;
          cursor: pointer;
        }
      }
    }

    .page-wrapper {
      flex: 1;
      padding: 20px;
      background: #fff;
    }
  }
}
</style>
