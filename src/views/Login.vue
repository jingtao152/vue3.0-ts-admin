<template>
    <div class="login">
        <el-card class="box-card ">
            <template #header class="clearfix">
                <span class="title">admin-管理系统</span>
            </template>
            <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
                <el-form-item label="账号" prop="user">
                    <el-input v-model="form.user"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="form.password"></el-input>
                </el-form-item>
                <div class="btn-center">
                    <el-button type="primary" @click="loginIn">登录</el-button>
                    <el-button>注册</el-button>
                </div>
            </el-form>
        </el-card>
    </div>
</template>

<script lang="ts">
import {defineComponent, reactive, ref} from 'vue'
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'

export interface User{
    user: string;
    password: string;
}
export interface Valid{
    required: boolean;
    message: string;
    trigger: string;
}
export interface Rule{
    user: Valid[];
    password: Valid[];

}

export default defineComponent({
    setup() {
        const store = useStore()
        const router = useRouter()
        const formRef = ref<null | HTMLElement>(null)
        const form  = reactive<User>({
            user: '',
            password: ''
        })
        const rules = reactive<Rule>({
            user: [
                {required: true, message: '请输入账号', trigger: 'blur'}
            ],
            password: [
                {required: true, message: '请输入密码', trigger: 'blur'}
            ]
        })
        const loginIn = () => {
            (formRef.value as any).validate(valid => {
                if (!valid) return
                store.dispatch('base/getMenu').then(() => {
                    router.push('/')
                })
            })
        }
        return {
            form,
            rules,
            formRef,
            loginIn
        }
    }
})
</script>
<style lang="scss">
.login {
    width: 100%;
    height: 100%;
    background: lightslategray;

    .box-card {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

        .el-card {
            width: 480px;
            height: 280px;

            .title {
                font-weight: 700;
                font-size: 24px;
                color: #2c3e50;
            }
        }
    }
}
</style>
