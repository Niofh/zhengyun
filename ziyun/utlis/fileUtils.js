import {SUCCESS_CODE, TOKEN} from "./const"
import Request from "./request.js"


/**
 * uni-app 封装上传文件
 * @param  params
 * @param  params.count    最多可以选择的图片张数，默认9
 * @param  params.url      开发者服务器 url
 * @param  params.fileType 文件类型，image/video/audio
 * @param  params.name     文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
 * @param  params.formData HTTP 请求中其他额外的 form data
 * @param  params.serverSuccess  uni.uploadFile 接口调用成功的回调函数
 */
export const uploadFile = function (
    {
        count,
        url,
        fileType = "image",
        name = "file",
        formData = {},
        chooseSuccess,
        serverSuccess
    }
) {

    // 选择文件
    uni.chooseImage({
        count,
        fileType,
        name,
        success({tempFilePaths, tempFiles}) {
            typeof serverSuccess === "function" && chooseSuccess(tempFilePaths, tempFiles)

            uni.showToast({
                title: "上传中...",
                icon: "loading",
                mask: true
            })

            // 循环选择图片上传到服务器
            tempFilePaths.forEach(filePath => {
                uni.uploadFile({
                    url,
                    name,
                    header: {
                        "Admin-Token": uni.getStorageSync(TOKEN)
                    },
                    formData,
                    filePath,
                    success(data) {
                        typeof serverSuccess === "function" && serverSuccess(JSON.parse(data.data))
                    },
                    fail() {
                        uni.showToast({
                            title: "上传图片失败",
                            icon: "none"
                        })
                    }
                })
            })

        },
        fail() {
            uni.showToast({
                title: "调用相册选图失败",
                icon: "none"
            })
        }
    })


}


