import {RewardsClaimed, RewardsSent, RewardsType} from "../../../lib/yakult/rewardStatus";

export default async function getRewardsInfo(req, res) {
    try {
        const claimedRewardsCount = await RewardsClaimed().then(response => {
            return Object.values(response[0])[0]
        })
        const sentRewardsCount = await RewardsSent().then(response => {
            return Object.values(response[0])[0]
        })
        const rewardTypes = await RewardsType().then(response => {
            return response
        })
        res.status(200)
        res.send({
            rewards: rewardTypes,
            meta: {
                sentRewards: sentRewardsCount,
                claimedRewards: claimedRewardsCount
            }
        })
        res.end
    } catch (e) {
        console.log(e)
    }
}