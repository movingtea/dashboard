import {UserCount} from "../../../lib/yakult/userInfo";
import {AvgTime, QrCodeCount} from "../../../lib/yakult/qrCodes";
import {RewardsClaimed, RewardsSent} from "../../../lib/yakult/rewardStatus";

export default async function DataOverview(req, res) {
    try {
        const claimedRewardsCount = await RewardsClaimed().then(response => {
            return Object.values(response[0])[0]
        })
        const sentRewardsCount = await RewardsSent().then(response => {
            return Object.values(response[0])[0]
        })
        const userCount = await UserCount().then(response => {
            return response[0].count
        })
        const usedQRCodesCount = await QrCodeCount().then(response => {
            return response[0].qr_code_count
        })

        const avgTime = await AvgTime().then(response => {
            return (response[0].avg_time).toFixed(2)
        })

        res.status(200)
        res.send({
            sentRewards: sentRewardsCount,
            claimedRewards: claimedRewardsCount,
            userCount: userCount,
            usedQRCodesCount: usedQRCodesCount,
            avgTime: avgTime
        })
    } catch (e) {
        console.log(e)
    }
}