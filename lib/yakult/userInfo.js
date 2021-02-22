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
export async function GetUsersScans(rowsPerPage, offset) {
    try {
        return await yakultQuery({
            query: `
                SELECT qr_codes.id, qr_codes.code, qr_codes.created_at as scanned_at, qr_codes.burnt, users.open_id, users.nickname, users.avatar, reward_types.name as reward_name, reward_user.sent
                     ,CASE WHEN reward_user.sent THEN '已发放' WHEN qr_codes.burnt THEN '未完成' ELSE '未抽奖' END as status
                FROM qr_codes
                         LEFT JOIN reward_user ON reward_user.qr_code_id = qr_codes.id
                         LEFT JOIN users ON reward_user.user_id = users.id
                         LEFT JOIN reward_types ON reward_types.type =
                                                   SUBSTR(reward_user.reward_type, CHAR_LENGTH(reward_user.reward_type) - LOCATE('sdraweR', REVERSE(reward_user.reward_type)) + 3)
                WHERE qr_codes.user_id IS NOT NULL
                ORDER BY scanned_at DESC
                LIMIT ?
                OFFSET ?`,
            // sdraweR = Rewards reversed lol (removing namespace from reward_user.reward_type to keep only reward name)
            values: [parseInt(rowsPerPage, 10), parseInt(offset, 10)]
        })
    } catch (e) {
        console.log(e)
    }
}

export async function TotalScannedCount() {
    try {
        return await yakultQuery({
            query: 'SELECT count(id) as count FROM qr_codes WHERE user_id IS NOT NULL'
        })
    } catch (e) {
        console.log(e)
    }
}
