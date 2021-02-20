import yakultQuery from "../dbConnection/yakult_connection";

export async function UserCount() {
    try {
        return await yakultQuery({
            query: 'SELECT count(id) AS count FROM users',
            values: ''
        })
    } catch (e) {
        console.log(e)
    }
}

export async function UserInfo() {
    try {
        return await yakultQuery({
            query: 'SELECT * FROM user_scan ORDER BY created_at DESC LIMIT 1000 ',
            values: ''
        })
    } catch (e) {
        console.log(e)
    }
}

export async function GetBurnt(user_id) {
    try {
        return await yakultQuery({
            query: 'SELECT * FROM qr_codes where user_id = ?',
            values: [user_id]
        })
    } catch (e) {
        console.log(e)
    }
}

export async function GetUserReward(qr_code_id) {
    try {
        return await yakultQuery({
            query: qr_code_id ? 'SELECT reward_type, sent FROM reward_user where qr_code_id = ?' : 'SELECT reward_type, sent FROM reward_user',
            values: qr_code_id ? [qr_code_id] : ''
        })
    } catch (e) {
        console.log(e)
    }
}

export async function GetUsersScans() {
    try {
        return await yakultQuery({
            query: `
                SELECT qr_codes.id,qr_codes.code, qr_codes.created_at as scanned_at, qr_codes.burnt, users.open_id, users.nickname, users.avatar, reward_types.name as reward_name, reward_user.sent
                    ,CASE WHEN reward_user.sent THEN '已发放' WHEN qr_codes.burnt THEN '未完成' ELSE '未抽奖' END as status
                FROM qr_codes 
                JOIN reward_user ON reward_user.qr_code_id = qr_codes.id 
                JOIN users ON reward_user.user_id = users.id
                JOIN reward_types ON reward_types.type = 
                SUBSTR(reward_user.reward_type, CHAR_LENGTH(reward_user.reward_type) - LOCATE('sdraweR', REVERSE(reward_user.reward_type)) + 3)
                WHERE qr_codes.user_id IS NOT NULL
                ORDER BY scanned_at DESC
                LIMIT 50`,
            // sdraweR = Rewards reversed lol (removing namespace from reward_user.reward_type to keep only reward name)
        })
    } catch (e) {
        console.log(e)
    }
}
