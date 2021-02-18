import {RewardsType} from "../../../lib/yakult/rewardStatus";

export default async function getRewardsInfo(req, res) {
    try {
        const rewardTypes = await RewardsType().then(response => {
            return response
        })
        res.status(200)
        res.send({
            rewards: rewardTypes,
        })
        res.end
    } catch (e) {
        console.log(e)
    }
}