import {QrCode, QrCodeCount} from "../../../lib/yakult/qrCodes";

export default async function getQrCode(req, res) {
    try {
        const usedQrCodes = await QrCode().then(response => {
            return response
        })
        const usedQRCodesCount = await QrCodeCount().then(response => {
            return Object.values(response[0])[0]
        })
        const averageTime = await QrCode().then(response => {
            const time = response.map(item => {
                return ((Date.parse(item.updated_at) - Date.parse(item.created_at)) / 1000)
            })
            const totalTime = time.reduce(function (a, b) {
                return a + b
            }, 0)
            return (totalTime / usedQRCodesCount).toFixed(2)
        })
        res.status(200)
        res.send({
            data: usedQrCodes,
            meta: {
                totalCount: usedQRCodesCount,
                averageTime: averageTime
            }
        })

    } catch (e) {
        console.log(e)
    }
}