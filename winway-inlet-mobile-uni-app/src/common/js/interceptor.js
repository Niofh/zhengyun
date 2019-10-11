import {TOKEN} from "./const"


// token不存在的处理
export const tokenNotHandle = function () {
    const page = getCurrentPages()
    console.log(page, page.length,page[page.length - 1].route)
    const route = page[page.length - 1].route;
    console.log("route", route)


    uni.redirectTo({
        url: "/pages/login/login?redirect=/" + route
    })
    console.log("redirect")
}

export const tokenInterceptor = function () {

    try {
        const token = uni.getStorageSync(TOKEN)
        console.log("token: ", token)
        if (!token) {
            tokenNotHandle()
        }
    } catch (e) {
        // error
        console.log("error", e)
        console.log("没有token")
        tokenNotHandle()
    }

}



