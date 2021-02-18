import {QrCode, QrCodeCount} from "../../../lib/yakult/qrCodes";

export default async function getQrCode(req, res) {
    try {
        const usedQrCodes = await QrCode().then(response => {
            return response
        })
        const usedQRCodesCount = await QrCodeCount().then(response => {
            return Object.values(response[0])[0]
        })
        res.status(200)
        res.send({
            data: usedQrCodes,
            meta: {
                totalCount: usedQRCodesCount,
            }
        })
        res.end
    } catch (e) {
        console.log(e)
    }
}