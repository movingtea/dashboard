import yakultQuery from "../dbConnection/yakult_connection";

export async function QrCode() {
    try {
        return await yakultQuery({
            query: 'SELECT * FROM qr_codes WHERE updated_at is not null',
            values: ''
        })
    } catch (e) {
        console.log(e)
    }
}

export async function QrCodeCount() {
    try {
        return await yakultQuery({
            query: 'SELECT count(id) as qr_code_count FROM qr_codes WHERE updated_at is not null',
            values: ''
        })
    } catch (e) {
        console.log(e)
    }
}

export async function AvgTime() {
    try {
        return await yakultQuery({
            query: 'SELECT AVG(TIMESTAMPDIFF(SECOND,created_at, updated_at)) as avg_time from qr_codes where updated_at is not null',
            values: ''
        })
    } catch (e) {
        console.log(e)
    }
}

