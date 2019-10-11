import Request from "./request"

const request = new Request()

/**
 * 用户登录
 * @param data
 * @returns {*}
 */
export const loginApi = function (data) {
    return request.postRequest("/api/sys/login/login", data)
}


/**
 * 用户注册
 * @param data Object 参数
 */
export const registerApi = function (data) {
    return request.postRequest("/api/sys/login/register", data)
}

/**
 * 发送验证码
 * @param phone
 * @param codeType  验证码类型 default（默认：注册）、login ：登录、security_mobile：安全(变更手机号码)
 */
export const sendSmsCodeApi = function (url = "/api/sys/login/sendSmsCode", phone, codeType = "default") {
    return request.getRequest(url, {phone, codeType})
}

/**
 * 忘记密码
 * @param data
 * @returns {*}
 */
export const forgetPwdApi = function (data) {
    return request.postRequest("/api/sys/login/updatePassword", data)
}

/**
 * 用户退出登录
 * @param data
 * @returns {*}
 */
export const logoutApi = function (data) {
    return request.postRequest("/mobile/logout/doLogoutMobile", data)
}

/**
 * 获取用户信息
 * @param data
 * @returns {*}
 */
export const getUserInfoApi = function (data) {
    return request.getRequest("/mobile/sys/login/getAgent", data)
}

/**
 * 经纪人修改手机号
 * @param data
 * @returns {*}
 */
export const updatePhoneApi = function (data) {
    return request.postRequest("/mobile/sys/login/updateAgentPhone", data)
}
/**
 * 修改密码
 * @param data
 * @returns {*}
 */
export const editPasswordApi = function (data) {
    return request.postRequest("/mobile/sys/login/changePassword", data)
}



