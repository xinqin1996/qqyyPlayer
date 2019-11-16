// 外部js,直接获取store的数据
// 直接import store对象

import storeInfo from "./index";

export function call() {
    console.log("打印store",storeInfo);
    console.log("打印store.state",storeInfo.state);
    console.log("打印store.getters",storeInfo.getters);
}
