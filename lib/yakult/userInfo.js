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
