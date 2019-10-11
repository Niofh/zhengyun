import Request from "./request"

const request = new Request()

/**
 * 本月业绩
 * @param data
 * @returns {*}
 */
export const getMyAchievementApi = function (data) {
  return request.getRequest("/mobile/order/getMyAchievement", data)
}

/**
 * 查询报单人订单进度
 * @param data
 * @returns {*}
 */
export const getOrderScheduleApi = function (data) {
  return request.postRequest("/mobile/order/getOrderSchedule", data)
}

/**
 * 订单详情
 * @param data
 * @returns {*}
 */
export const getOrderDetailsApi = function (data) {
  return request.getRequest("/mobile/order/getOrderDetails", data)
}

/*取消草稿*/
export const cancelOrderApi = function (data) {
  return request.postRequest("/mobile/order/cancelOrder", data)
}

