import excuteQuery from '../dbConnection/db_connection';

export async function getDealerInfo(provinceId, cityId) {
    if (provinceId) {
        try {
            return await excuteQuery({
                query: 'SELECT * FROM dealers_information WHERE province_id = ?',
                values: [provinceId]
            })
        } catch (e) {
            console.log(e)
        }
    } else if (cityId) {
        try {
            return await excuteQuery({
                query: 'SELECT * FROM dealers_information WHERE city_id = ?',
                values: [cityId]
            })
        } catch (e) {
            console.log(e)
        }
    } else {
        try {
            return await excuteQuery({
                query: 'SELECT * FROM dealers_information',
                values: ''
            })
        } catch (e) {
            console.log(e)
        }
    }

}

export async function getProvince() {
    try {
        return await excuteQuery({
            query: 'SELECT * FROM dealers_province ORDER BY ID ASC',
            values: ''
        })
    } catch (e) {
        console.log(e)
    }
}

export async function getCity(provinceId) {
    try {
        return await excuteQuery({
            query: provinceId ? 'SELECT * FROM dealers_city WHERE province_id = ?' : 'SELECT * FROM dealers_city',
            values: provinceId ? [provinceId] : ''
        })
    } catch (e) {
        console.log(e)
    }
}