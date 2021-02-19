import {GetUserReward} from "../../../lib/yakult/userInfo";

export default async function getUserInfo(req, res) {
    try {
        const userData = await GetUserReward().then(response => {
            console.log('started', new Date())
            response.map(_ => {
                //console.log('mapping reward')
                switch (_.reward_type) {
                    case 'App\\Models\\Rewards\\RedPocket':
                        _.reward_type = '微信红包';
                        break;
                    case 'App\\Models\\Rewards\\Image':
                        _.reward_type = '手机壁纸';
                        break;
                    case 'App\\Models\\Rewards\\Physical':
                        _.reward_type = '扫地机器人';
                        break;
                    case 'App\\Models\\Rewards\\JDCode':
                        _.reward_type = '京东E卡';
                        break;
                }
                switch (_.sent) {
                    case 1:
                        _.sent = '已发放';
                        break;
                    case 0:
                        _.sent = '未完成';
                        break;
                }
            })
            return response
        })
        res.status(200)
        res.send({
            data: userData
        })
        res.end
        console.log('end', new Date())
    } catch (e) {
        console.log(e)
    }
}