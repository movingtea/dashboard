import excuteQuery from '../dbConnection/db_connection';

export async function DealerInformation() {

}

export async function getProvince() {
    try{
        return await excuteQuery({
            query: 'SELECT * FROM dealers_province',
            values: ''
        })
    } catch (e) {
        console.log(e)
    }
}

export async function getCity() {
    try{
        return await excuteQuery({
            query: 'SELECT * FROM dealers_city',
            values: ''
        })
    } catch (e) {
        console.log(e)
    }
}