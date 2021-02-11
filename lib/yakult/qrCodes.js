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
            query: 'SELECT count(*) FROM qr_codes WHERE updated_at is not null',
            values: ''
        })
    } catch (e) {
        console.log(e)
    }
}

