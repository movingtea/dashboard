import mysql from 'serverless-mysql';

const db_connection = mysql({
    config: {
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        database: process.env.MYSQL_DB,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PW
    }
});
export default async function excuteQuery({ query, values }) {
    try {
        const results = await db_connection.query(query, values);
        await db_connection.end();
        return results;
    } catch (error) {
        return { error };
    }
}