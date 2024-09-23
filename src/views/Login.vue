<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref } from 'vue'
import {userRegisterService,userLoginService} from "@/api/user.js"
import { ElMessage } from 'element-plus'
// Control registration and login form display, default is registration
const isRegister = ref(false)

// Define data model
const registerData = ref({
    username: "",
    password: '',
    rePassword: ""
})

// Validate password function
const checkRePassword = (rule, value, callback) => {
    if (value === '') {
        callback(new Error("请再次输入密码"))
    } else if (value !== registerData.value.password) {
        callback(new Error("两次输入的密码不一致"))
    } else {
        callback()
    }
}

// Define form validation rules
const rules = {
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { max: 16, min: 5, message: '请输入5~16位的非空字符串', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { max: 16, min: 5, message: '请输入5~16位的非空字符串', trigger: 'blur' }
    ],
    rePassword: [
        { validator: checkRePassword, trigger: 'blur' }
    ]
}


const  register = async () => {
  let result =   await userRegisterService(registerData.value);
//   alert(result.message ? result.message : "注册成功");
    ElMessage.success(result.message ? result.message : "注册成功")
}
//绑定数据

//数据校验

//登陆函数
import {useRouter} from "vue-router"
import { useTokenStore } from '@/stores/token.js';
const router = useRouter()
const tokenstore = useTokenStore();
const login =async ()=>{
    //调用函数
   let result =  await userLoginService(registerData.value)
//    alert(result.message ? result.message : "登陆成功");
    ElMessage.success(result.message ? result.message : "登陆成功")
    //存储到pinia
    console.log(result.data)
    tokenstore.setToken(result.data)
    
    //
    router.push('/')
}
//清空数据
const clearRegisterData=()=>{
    registerData.value={
        username:'',
        password:'',
        rePassword:''
    }
}

</script>

<template>
    <el-row class="login-page">
        <el-col :span="12" class="bg"></el-col>
        <el-col :span="6" :offset="3" class="form">
            <!-- Registration form -->
            <el-form ref="form" size="large" autocomplete="off" v-if="isRegister" :model="registerData" :rules="rules">
                <el-form-item>
                    <h1>注册</h1>
                </el-form-item>
                <el-form-item prop="username">
                    <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="registerData.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input :prefix-icon="Lock" type="password" placeholder="请输入密码" v-model="registerData.password"></el-input>
                </el-form-item>
                <el-form-item prop="rePassword">
                    <el-input :prefix-icon="Lock" type="password" placeholder="请再次输入密码" v-model="registerData.rePassword"></el-input>
                </el-form-item>
                <!-- Register button -->
                <el-form-item>
                    <el-button class="button" type="primary" auto-insert-space @click="register">
                        注册
                    </el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <el-link type="info" :underline="false" @click="isRegister = false;clearRegisterData()">
                        ← 返回
                    </el-link>
                </el-form-item>
            </el-form>
            <!-- Login form -->
            <el-form ref="form" size="large" autocomplete="off" v-else :model="registerData" :rules="rules">
                <el-form-item>
                    <h1>登录</h1>
                </el-form-item>
                <el-form-item prop="username">
                    <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="registerData.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input name="password" :prefix-icon="Lock" type="password" placeholder="请输入密码" v-model="registerData.password"></el-input>
                </el-form-item>
                <el-form-item class="flex">
                    <div class="flex">
                        <el-checkbox>记住我</el-checkbox>
                        <el-link type="primary" :underline="false">忘记密码？</el-link>
                    </div>
                </el-form-item>
                <!-- Login button -->
                <el-form-item>
                    <el-button class="button" type="primary" auto-insert-space @click="login">登录</el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <el-link type="info" :underline="false" @click="isRegister = true ;clearRegisterData()">
                        注册 →
                    </el-link>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<style lang="scss" scoped>
/* Styles */
.login-page {
    height: 100vh;
    background-color: #fff;

    .bg {
        background: url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
            url('@/assets/login_bg.jpg') no-repeat center / cover;
        border-radius: 0 20px 20px 0;
    }

    .form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        user-select: none;

        .title {
            margin: 0 auto;
        }

        .button {
            width: 100%;
        }

        .flex {
            width: 100%;
            display: flex;
            justify-content: space-between;
        }
    }
}
</style>
