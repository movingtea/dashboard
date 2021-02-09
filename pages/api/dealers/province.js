import {getProvince} from "../../../lib/dealers/dealers";

export default async function Province(req, res) {
    try{
        await getProvince().then(response => {
            res.status(200)
            res.send(response)
            res.end
        })
    } catch (e) {
        console.log(e)
    }
}