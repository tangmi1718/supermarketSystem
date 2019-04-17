// 所有数
export function priceValite(val){
    var reg = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/;
    return reg.test(val);
}
// 可保留两位数
export function twoDecimals(val){
    var reg = /([0-9]+\.[0-9]{2})[0-9]*/;/(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/;
    return reg.test(val);
}
// 正整数
export function intNumber(val){
    var reg = /^[1-9]\d*$/;
    return reg.test(val);
}

//匹配非负整数（正整数 + 0）
export function positiveNumber(val){
    var reg = /^[1-9]\d*|0$/;
    return reg.test(val);
}