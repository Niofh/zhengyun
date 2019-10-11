import Request from "./request"

const request = new Request()

/**
 * 关于我们
 * @param data
 * @returns {*}
 */
export const getAboutUsApi = function (data) {
    return request.getRequest("/mobile/content/aboutus/getAboutUs", data)
}


/**
 * 注册协议
 * @param data
 * @returns {*}
 */
export const getRegistrationProtocolApi = function (data) {
    return request.getRequest("/api/registrationProtocol/findById", data)
}
