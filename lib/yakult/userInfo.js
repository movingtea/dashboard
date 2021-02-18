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
            query: 'SELECT id, user_id, open_id, nickname, avatar, code, burnt, created_at FROM user_scan LIMIT 100',
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
            query: 'SELECT reward_type, sent FROM reward_user where qr_code_id = ?',
            values: [qr_code_id]
        })
    } catch (e) {
        console.log(e)
    }
}