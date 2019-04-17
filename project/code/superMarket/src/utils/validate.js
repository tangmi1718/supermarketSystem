// 正则验证密码
export function passwordValidate(val){
    const reg = /^[a-zA-Z]\w{2,5}$/;
    return reg.test(val);
}