import {GetUserReward, GetUsersScans, UserCount, UserInfo} from '../../../lib/yakult/userInfo';

export default async function getUserInfo(req, res) {
    try {
        console.log('started', new Date());
        const userData = await GetUsersScans().then(response => {
            response.map(row => {
                row.created_at = new Date(row.scanned_at).toLocaleString('chinese', {hourCycle: 'h23'});
            });
            return response;
        });
        const userCount = await UserCount().then(response => {
            return response[0].count
        });
        res.status(200);
        res.send({
            data: userData,
            meta: {
                totalCount: userCount,
                rowsPerPage: req.query.rowsPerPage,
                pageCount: Math.ceil(userCount / req.query.rowsPerPage),
                page: req.query.page
            }
        });
        res.end;
        console.log('end', new Date())
    } catch (e) {
        console.log(e)
    }
}
