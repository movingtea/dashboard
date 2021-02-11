import {UserCount, UserInfo} from "../../../lib/yakult/userInfo";

export default async function getUserInfo(req, res) {
    try {
        const userData = await UserInfo().then(response => {
            return response
        })
        const userCount = await UserCount().then(response => {
            return Object.values(response[0])[0]
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