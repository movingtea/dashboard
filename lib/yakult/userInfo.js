import yakultQuery from "../dbConnection/yakult_connection";

export async function UserInfo() {
    try {
        return await yakultQuery({
            query: 'SELECT * FROM users LIMIT ?',
            values: 10
        })
    } catch (e) {
        console.log(e)
    }
}

export async function UserCount() {
    try {
        return await yakultQuery({
            query: 'SELECT count(*) FROM users',
            values: ''
        })
    } catch (e) {
        console.log(e)
    }
}