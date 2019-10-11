import Request from "./request"

const request = new Request()

/**
 * 消息中心
 * @param data
 * @returns {*}
 */
export const getMessageApi= function (data) {
    return request.getRequest("/mobile/message/pageList", data)
}

/**
 * 查看消息
 * @param data
 * @returns {*}
 */
export const getMessagefindByIdApi = function (data) {
    return request.getRequest("/mobile/message/findById", data)
}

/**
 * 获取站内信未读数
 * @param data
 * @returns {*}
 */
export const getAgentMessageStatusApi = function (data) {
    return request.getRequest("/mobile/message/getAgentMessageStatus", data)
}


/**
 * 删除消息
 * @param data
 * @returns {*}
 */
export const deleteMessageApi = function (data) {
    return request.getRequest("/mobile/message/deleteMessage", data)
}
