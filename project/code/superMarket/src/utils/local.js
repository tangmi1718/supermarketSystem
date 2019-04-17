/* 
    本地存储的 localStorage 封装
*/

export default {
    // 保存token到浏览器
    save(key,value){
        window.localStorage.setItem(key,JSON.stringify(value));
    },
    //获取token
    get(key) {
        return JSON.parse(window.localStorage.getItem(key));
    },
    // 删除token
    remove(key) {
        window.localStorage.removeItem(key)
    }
}