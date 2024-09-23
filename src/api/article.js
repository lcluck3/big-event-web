//导入@/stores/token.js
import request from "@/utils/request.js"


//文章分类列表查询
export const articleCategoryListService = () => {
   
    //通过请求头Authorization携带token
    return request.get('/category')
}
//添加
//添加文章分类
export const articleCategoryAddService = (categoryModel) => {
    return request.post('/category', categoryModel)
}
//编辑文章分类
export const articleCategoryUpdateService = (categoryModel) =>{
    return request.put('/category', categoryModel)
}
//删除
export const articleCategoryDeleteService = (id) =>{
    return request.delete('/category?id='+id )
}

//查询所有文章信息
export const articleListService = (params) =>{
    return request.get("/article",{params:params})
}
//文章添加
export const articleAddService = (articleData) =>{
   return request.post('/article',articleData)
}

//删除文章
export const articleDeleteService = (id) =>{
    return request.delete('/article?id='+id )
}

export const articleUpdateService = (articleModel) =>{
    return request.put('/article', articleModel)
}