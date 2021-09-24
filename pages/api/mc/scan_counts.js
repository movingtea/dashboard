import {UserScanCount, Count} from "../../../lib/mooncake/userInfo";

export default async function getUserScanCount(req, res) {
    const rowsPerPage = req.query.rowsPerPage
    const offset = req.query.offset
    console.log(req)
    try {
        const totalRecordsCount = await Count().then(response => {
            console.log(response[0].count)
            return response[0].count
        })
        await UserScanCount().then(response => {
            res.status(200)
            res.send({
                data: response,
                meta: {
                    totalCount: totalRecordsCount,
                    rowsPerPage: req.query.rowsPerPage,
                    pageCount: Math.ceil(totalRecordsCount / req.query.rowsPerPage),
                    page: req.query.page
                }
            })
            res.end
        })
    } catch (e) {
        console.log(e)
    }
}