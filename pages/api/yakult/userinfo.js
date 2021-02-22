import {GetUsersScans, TotalScannedCount} from '../../../lib/yakult/userInfo';

export default async function getUserInfo(req, res) {
    const rowsPerPage = req.query.rowsPerPage
    const offset = req.query.offset
    try {
        const userData = await GetUsersScans(rowsPerPage, offset).then(response => {
            //console.log(response)
            response.map(row => {
                row.scanned_at = new Date(row.scanned_at).toLocaleString('chinese', {hourCycle: 'h23'});
            });
            return response;
        });
        const userCount = await TotalScannedCount().then(response => {
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
    } catch (e) {
        console.log(e)
    }
}
