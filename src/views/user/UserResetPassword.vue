<script setup>
import { ref } from 'vue'
import useuserInfoStore from '@/stores/userinfo';
import { ElMessage} from 'element-plus'
import { userPasswordUpdataService } from '@/api/user';
import {useRouter} from "vue-router"
import { useTokenStore } from '@/stores/token.js';
const userInfoStore = useuserInfoStore();
const tokenStore = useTokenStore();
const router = useRouter();
const registerData = ref({
    old_pwd: '',
    new_pwd: '',
    re_pwd: ''
})



const updataPassword = async() => {
        console.log(registerData.value)
        // 这里添加更新密码的逻辑，例如发送请求到服务器
        let result = await userPasswordUpdataService(registerData.value)
        ElMessage.success('密码更新成功')
        // 清空表单

        //
        tokenStore.removeToken()
        userInfoStore.removeInfo()
        router.push('/')
    
}

const checkRePassword = (rule, value, callback) => {
    if (value === '') {
        callback(new Error("请再次输入密码"))
    } else if (value !== registerData.value.newPassword) {
        callback(new Error("两次输入的密码不一致"))
    } else {
        callback()
    }
}

const rules = {
    oldPassword: [
        { required: true, message: '请输入原密码', trigger: 'blur' },
    ],
    newPassword: [
        { required: true, message: '请输入新密码', trigger: 'blur' },
        { max: 16, min: 5, message: '请输入5~16位的非空字符串', trigger: 'blur' }
    ],
    rePassword: [
        { validator: checkRePassword, trigger: 'blur' }
    ]
}
</script>

<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>基本资料</span>
            </div>
        </template>
        <el-row>
            <el-col :span="12">
                <el-form :model="registerData" :rules="rules" label-width="100px" size="large">
                    <el-form-item label="原密码" prop="oldPassword">
                        <el-input v-model="registerData.old_pwd" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="newPassword">
                        <el-input v-model="registerData.new_pwd" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="rePassword">
                        <el-input v-model="registerData.re_pwd" type="password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="updataPassword">提交修改</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </el-card>
</template>
