import Request from "./request"

const request = new Request()

/**
 * 获取省份
 * @param data
 * @returns {*}
 */
export const getProvincial = function (data) {
    return request.getRequest("/sys/provincial/list", data)
}
/**
 * 获取省份
 * @param data
 * @returns {*}
 */
export const getCity = function (data) {
    return request.getRequest("/sys/city/list", data)
}
