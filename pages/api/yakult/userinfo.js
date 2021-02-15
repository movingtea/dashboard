import {GetUserReward, UserCount, UserInfo} from "../../../lib/yakult/userInfo";

export default async function getUserInfo(req, res) {
    try {
        const userData = await UserInfo().then(response => {
            response.map(item => {
                const created_at = new Date(item.created_at).toLocaleString('chinese', {hour12: false})
                if (item.burnt === 1) {
                    GetUserReward(item.id).then(response => {
                        response.map(status => {
                            switch (status.reward_type) {
                                case 'App\\Models\\Rewards\\RedPocket':
                                    item.rewardType = '微信红包';
                                    break;
                                case 'App\\Models\\Rewards\\Image':
                                    item.rewardType = '手机壁纸';
                                    break;
                                case 'App\\Models\\Rewards\\Physical':
                                    item.rewardType = '扫地机器人';
                                    break;
                                case 'App\\Models\\Rewards\\JDCode':
                                    item.rewardType = '京东E卡';
                                    break;
                            }
                            switch (status.sent) {
                                case 1:
                                    item.rewardStatus = '已发放';
                                    break;
                                case 0:
                                    item.rewardStatus = '未完成';
                                    break;
                            }
                            //item.rewardStatus = status.sent
                        })
                    })
                } else {
                    item.rewardType = null
                    item.rewardStatus = '未抽奖'
                }
                item.created_at = created_at
            })
            return response
        })
        const userCount = await UserCount().then(response => {
            return response[0].count
        })
        res.status(200)
        res.send({
            data: userData,
            meta: {
                totalCount: userCount,
            }
        })
        res.end
    } catch (e) {
        console.log(e)
    }
}