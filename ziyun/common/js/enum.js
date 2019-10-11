// 订单状态
export const OrderStatusEnum = {
    CAO_GAO: 0,
    DAI_PING_GU: 1,
    YI_PING_GU: 2,
    JIN_DIAO_ZHONG: 3,
    YI_FOU_JUE: 4,
    ZHONG_SHEN_TONG_GUO: 5,
    YI_QIAN_YUE: 6,


    properties: {
        0: {name: "草稿"},
        1: {name: "待评估"},
        2: {name: "已评估"},
        3: {name: "尽调中"},
        4: {name: "已否决"},
        5: {name: "终审通过"},
        6: {name: "已签约"},
    },


    /**
     * @param id
     */
    getEnumName(id) {
        if (!this.properties[id]) {
            return "未知状态"
        }
        return this.properties[id].name
    }

}

// 订单子状态,已评估下面有的三个状态(0:已评估,1:已申请预约)
export const SubOrderStatusEnum = {

    WEI_YU_YUE: 0,
    YI_YU_YUE: 1,
    QUE_REN_YUE_YUE: 2,

    properties: {
        0: {name: "已评估"},
        1: {name: "已申请预约"},
        2: {name: "已确认预约"},
    },


    /**
     * @param id
     */
    getEnumName(id) {
        return this.properties[id].name
    }

}




