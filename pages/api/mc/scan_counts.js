import {UserScanCount, Count} from "../../../lib/mooncake/userInfo";

export default async function getUserScanCount(req, res) {
    const rowsPerPage = req.query.rowsPerPage
    const offset = req.query.offset
    try {
        const totalRecordsCount = await Count().then(response => {
            console.log(response[0])
            return response[0]
        })
        await UserScanCount(rowsPerPage, offset).then(response => {
            res.status(200)
            res.send({
                data: response,
                meta: {
                    totalCount: totalRecordsCount,
                    rowsPerPage: rowsPerPage,
                    pageCount: Math.ceil(totalRecordsCount / rowsPerPage),
                    page: req.query.page
                }
            })
            res.end
        })
    } catch (e) {
        console.log(e)
    }
}