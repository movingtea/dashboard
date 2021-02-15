import {DailyScan} from "../../../lib/yakult/charts";

export default async function chartData(req, res) {
    try {
        const chartData = await DailyScan().then(response => {
            let labels = []
            let counts = []
            response.map(item => {
                item.scan_date = new Date(item.scan_date).toLocaleDateString('chinese', {hour12: false})
                labels.push(item.scan_date)
                counts.push(item.count)
            })
            return {labels, counts}
        })
        res.status(200)
        res.send(chartData)
        res.end
    } catch (e) {
        console.log(e)
    }
}