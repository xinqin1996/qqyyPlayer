

/**
 * 通用JSAPI包装
 * @param {String} api jsapi名称
 * @param {Object || Function} options 配置选项或者回调函数
 */
export function __commonWrap(api, options = {}){

    return new Promise((resolve, reject) => {

        bridge.call(api, options, res => {
            // resolve(res)
            (res && res.errorCode && res.errorCode != 0) ? reject(res) : resolve(res)
        })
    })
}

/**
 * 监听jsbridge ready事件
 * @param {Function} callback 回调函数
 */
export function ready (callback) {
    if (window.bridge) {
        callback && callback()
    } else {
        // document.addEventListener('bridgeReady', callback, false)
        window.bridge = function(callback){
            callback && callback()
        }
    }
}

/**
 * 生成pushWindow所需要的参数
 * @param {number} appId 目标页的appId
 * @param {Object} param 对客户端的设置
 * @param {Object} passData 需传递的页面参数
 */
export function pushWindowParam(appId, param, pageConfig){
    const { os } = App.device  // true => ios  false => android
    const dev = ENVCONF.NODE_ENV === 'development'

    const defaultParam = {
        titleBarColor: 16777215,
        showOptionMenu: false,
        showTitleBar: true
    }

    const method = dev ? 'pushWindow' : 
        appId ? 'startH5App' : 'pushWindow'

    let startparams = Object.assign(defaultParam, pageConfig.pushParam, param)
    
    return {
        method,
        obj: Object.assign(
            (dev || !appId) ? {} : { appId: String(appId) },
            //合并 默认配置 conf配置 传参配置
            method == 'startH5App' ? startparams : {param: startparams}
        )
    }
}

/**
 * 构建参数字符串
 * @param {Object} data 数据对象
 * @returns {String} 对象字符串
 */
export function buildParams (data) {
    let paramsArr = []
    data = data || {}
    console.log(data)
    for(let key in data){
        // if(typeof(data[key])=="object")
        //     return buildParams(data[key])
        paramsArr.push(encodeURIComponent(key || '') 
            + '=' + encodeURIComponent(JSON.stringify(data[key]) || ''))
    }
    return paramsArr.join('&')
}

/**
 * 解构查询字符串参数
 * @param {String} querystring 查询字符串
 * @returns {Object} 数据对象
 */
export function parseParams (querystring) {
    let searchArr = (querystring || '').split('&') || []
    let params = {}
    
    searchArr.forEach(keyvalue => {
        let keyPair = keyvalue.split('=') || []
        if(keyPair[0]){
            params[decodeURIComponent(keyPair[0])] = decodeURIComponent(keyPair[1] || '')
        }
    });

    return params
}

/**
 * 全局唯一标示生成
 */
export function uuid(len = 8,radix = 16) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [], i;
    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
    return uuid.join('');
}