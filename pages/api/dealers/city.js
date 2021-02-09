import {getCity} from "../../../lib/dealers/dealers";

export default async function City(req, res) {
    try{
        await getCity().then(response => {
            res.status(200)
            res.send(response)
            res.end
        })
    } catch (e) {
        console.log(e)
    }
}