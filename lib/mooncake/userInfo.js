import mcQuery from "../dbConnection/mc_connection";

export async function UserScanCount(rowsPerPage, offset) {
    try {

        return await mcQuery({
            query: `SELECT *
                    FROM scan_count
                    limit ? OFFSET ?`,
            values: [parseInt(rowsPerPage, 10), parseInt(offset, 10)]
        })
    } catch (e) {
        console.log(e)
    }
}

export async function Count() {
    try {
        return await mcQuery({
            query: 'SELECT count(id) AS count FROM scan_count',
            values: ''
        })
    } catch (e) {
        console.log(e)
    }
}