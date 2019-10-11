import Request from "./request"

const request = new Request()


/**
 * 获取产品列表
 * @param data
 * @returns {*}
 */
export const getProductListApi = function (data) {
    return request.getRequest("/mobile/content/product/getProductList", data)
}

/**
 * 获取产品列表 不分页
 * @param data
 * @returns {*}
 */
export const getProductListNoPageApi = function (data) {
    return request.getRequest("/mobile/content/product/getList", data)
}

/**
 * 获取首页推送产品
 * @param data
 * @returns {*}
 */
export const getProductPushListApi = function (data) {
    return request.getRequest("/mobile/content/product/getProductPushList", data)
}

/**
 * 提交报单草稿
 * @param data
 * @returns {*}
 */
export const saveOrderDraftApi = function (data) {
    return request.postRequest("/mobile/order/saveOrder", data)
}

/**
 * 获取上传图片地址和信息
 * @param data
 * @returns {*}
 */
export const getUploadUrlApi = function (data) {
    return request.getRequest("/mobile/upload/getUploadParameter", data)
}


/**
 * 提交报单附件
 * @param data
 * @returns {*}
 */
export const saveOrderFilesApi = function (data) {
    return request.postRequest("/mobile/order/saveOrderFiles", data)
}

/**
 * 查询订单分页列表
 * 订单状态：common/js/const.js
 * @param data
 * @returns {*}
 */
export const getOrderPageListApi = function (data) {
    return request.postRequest("/mobile/order/getOrderPageList", data)
}


/**
 * 预约尽调
 * 订单状态：common/js/const.js
 * @param data
 * @returns {*}
 */
export const feedbackInfoSaveApi = function (data) {
    return request.postRequest("/mobile/order/feedbackInfoSave", data)
}







