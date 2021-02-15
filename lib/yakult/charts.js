import yakultQuery from "../dbConnection/yakult_connection";

export async function DailyScan(startDate, endDate) {
    try {
        return await yakultQuery({
            query: 'SELECT date(created_at) AS scan_date, count(*) AS count FROM yakult_cny_2021.qr_codes WHERE created_at is not null GROUP BY scan_date',
            values: ''
        })
    } catch (e) {
        console.log(e)
    }
}