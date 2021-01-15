<template>
    <div class="login">
        <div class="login-wrapper">
            <div class="login-log-wrapper" :style="{ background: colorStyle }">
                <div class="time">{{ time }}</div>
                <div class="login-log">
                    <img class="img" src="https://avuejs.com/images/logo.png" alt=""/>
                    <p class="title">通用后台管理模板</p>
                </div>
            </div>
            <div class="box-card">
                <div class="login-title">登录 Admin</div>
                <el-form
                    class="form-card"
                    ref="formRef"
                    :model="form"
                    :rules="rules"
                    label-width="80px"
                >
                    <el-form-item label="账号" prop="user">
                        <el-input v-model="form.user"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="form.password"></el-input>
                    </el-form-item>
                    <el-form-item label="验证码" prop="code">
                        <div class="code-wrapper">
                            <el-input class="code-input" v-model="form.code"></el-input>
                            <ValidCode ref="codeRef" v-model="codeImg"></ValidCode>
                        </div>
                    </el-form-item>
                    <div class="btn-center">
                        <el-button type="primary" @click="loginIn">登录</el-button>
                        <el-button>注册</el-button>
                    </div>
                    <div class="three-login">
                        <span>其他登录方式</span>
                        <img @click="handleClick('wechat')" src="../assets/wx.svg" alt=""/>
                        <img
                            @click="handleClick('tencent')"
                            src="../assets/qq.svg"
                            alt=""
                        />
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {computed, defineComponent, reactive, ref, onUnmounted} from 'vue'
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'
import ValidCode from '../components/ValidCode.vue'
import {dateFormat} from '../util/date'
import {openWindow} from '../util/util'

export interface User {
    user: string;
    password: string;
    code: string;
}

export interface Valid {
    required?: boolean;
    validator?: (rule, value, callback) => void;
    message?: string;
    trigger: string;
}

export interface Rule {
    user: Valid[];
    password: Valid[];
    code: Valid[];
}

// 账号密码验证码定义
const loginPassEvent = (store) => {
    const router = useRouter()
    const codeImg = ref('123')
    const formRef = ref<null | HTMLElement>(null)
    const codeRef = ref<HTMLElement | null>(null)
    const form = reactive<User>({
        user: '',
        password: '',
        code: '',
    })
    const validateCode = (rule, value, callback) => {
        if (!value) {
            callback(new Error('请输入验证码'))
        } else if (value.toLowerCase() !== codeImg.value.toLowerCase()) {
            callback(new Error('验证码输入错误'))
        }
        callback()
    }
    const rules = reactive<Rule>({
        user: [{required: true, message: '请输入账号', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}],
        code: [
            {required: true, message: '请输入验证码', trigger: 'blur'},
            {validator: validateCode, trigger: 'blur'},
        ],
    })
    const loginIn = () => {
        (formRef.value as any).validate((valid) => {
            if (!valid) {
                if (codeRef.value) {
                    (codeRef.value as any).refresh()
                }
                return
            }
            // 验证完成，发送登录请求，获取token
            store.commit('base/SET_TOKEN', 'tokenVal')
            store.dispatch('base/getMenu').then(() => {
                router.push('/')
            })
        })
    }
    return {codeImg, form, rules, loginIn, formRef, codeRef}
}
// 第三方登录
const threeLoginEvent = () => {
    const handleClick = (thirdpart) => {
        let appid, clientId, url
        const redirectUri = encodeURIComponent(
            window.location.origin + '/#/authredirect'
        )
        if (thirdpart === 'wechat') {
            appid = 'xxxx'
            url =
                'https://open.weixin.qq.com/connect/qrconnect?appid=' +
                appid +
                '&redirect_uri=' +
                redirectUri +
                '&state=WX&response_type=code&scope=snsapi_login#wechat_redirect'
        } else if (thirdpart === 'tencent') {
            clientId = 'xxxx'
            url =
                'https://graph.qq.com/oauth2.0/authorize?response_type=code&state=QQ&client_id=' +
                clientId +
                '&redirect_uri=' +
                redirectUri
        }
        openWindow(url, thirdpart, 540, 540)
    }
    return {handleClick}
}
//   获取主题色
const colorEvent = (store) => {
    const color = computed(() => {
        return store.getters['base/colorStyle']
    })
    const colorStyle = ref(color.value)
    return {colorStyle}
}
// 时间相关
const timeEvent = () => {
    const time = ref('')
    const getTime = () => {
        time.value = dateFormat(new Date())
    }
    getTime()
    // 定时调用时间
    const timer = setInterval(() => {
        getTime()
    }, 1000)
    // 页面销毁时，清除定时器
    onUnmounted(() => {
        clearInterval(timer)
    })
    return {time}
}
export default defineComponent({
    setup() {
        const store = useStore()
        const {codeImg, form, rules, loginIn, formRef, codeRef} = loginPassEvent(
            store
        )
        const {colorStyle} = colorEvent(store)
        const {time} = timeEvent()
        const {handleClick} = threeLoginEvent()
        return {
            form,
            rules,
            formRef,
            loginIn,
            colorStyle,
            codeImg,
            codeRef,
            time,
            handleClick,
        }
    },
    components: {
        ValidCode,
    },
})
</script>
<style lang="scss">
.login {
    width: 100%;
    height: 100%;
    background: url('../assets/cloud.jpg') 0 bottom repeat-x #049ec4;
    animation: animate-cloud 20s linear infinite;

    .login-wrapper {
        display: flex;
        width: 1000px;
        height: 500px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

        .login-log-wrapper {
            flex: 1;
            display: flex;
            flex-direction: column;
            padding: 25px;
            color: #fff;

            .login-log {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                .img {
                    width: 140px;
                }

                .title {
                    margin-top: 60px;
                    text-align: center;
                    color: #fff;
                    font-weight: 300;
                    letter-spacing: 2px;
                    font-size: 25px;
                }
            }
        }

        .box-card {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background: #fff;

            .login-title {
                font-size: 32px;
                line-height: 100px;
                color: #606266;
            }

            .form-card {
                width: 90%;

                .title {
                    font-weight: 700;
                    font-size: 24px;
                    color: #2c3e50;
                }

                .code-wrapper {
                    display: flex;

                    .code-input {
                        flex: 1;
                        margin-right: 15px;
                    }
                }

                .three-login {
                    margin-top: 100px;

                    span {
                        vertical-align: middle;
                    }

                    img {
                        width: 30px;
                        vertical-align: middle;
                        cursor: pointer;
                        margin-left: 15px;
                    }
                }
            }
        }
    }
}
</style>
