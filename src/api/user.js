//导入request.js工具
import request from "@/utils/request.js"

//调用注册接口的函数
export const userRegisterService = (registerData)=>{
    //需要借助UrlSearchParam完成传递
    const param = new URLSearchParams()
    for(let key in registerData){
        param.append(key,registerData[key])
    }
    return request.post("/user/register",param)
}

//登陆接口的函数
export const userLoginService=(loginData)=>{
    const param = new URLSearchParams()
    for(let key in loginData){
        param.append(key,loginData[key])
    }
    return request.post('user/login',param)

}

//获取用户详细的接口函数
export const userInfoService =  ()=>{
    return request.get('/user/userInfo')
}

//修改信息
export const userInfoUpdataService = (userInfoData)=>{
    return request.put('/user/updata',userInfoData)
}

//修改头像
//修改头像
export const userAvatarUpdateService=(avatarUrl)=>{
    let params = new URLSearchParams();
    params.append('avatarUrl',avatarUrl)
    return request.patch('/user/updateAvatar',params)
}

export const userPasswordUpdataService = (userPasswordData) => {
 
    return request.patch('/user/updatePwd', userPasswordData);
}