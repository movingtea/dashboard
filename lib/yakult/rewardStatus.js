import yakultQuery from "../dbConnection/yakult_connection";

export async function RewardsClaimed() {
    try {
        return await yakultQuery({
            query: 'SELECT count(id) FROM reward_user WHERE sent = 1',
            values: ''
        })
    } catch (e) {
        console.log(e)
    }
}

export async function RewardsSent() {
    try {
        return await yakultQuery({
            query: 'SELECT count(id) FROM reward_user',
            values: ''
        })
    } catch (e) {
        console.log(e)
    }
}

export async function RewardsType() {
    try {
        return await yakultQuery({
            query: 'SELECT * FROM reward_types',
            values: ''
        })
    } catch (e) {
        console.log(e)
    }


}