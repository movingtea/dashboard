import {getCity} from "../../../lib/dealers/dealers";

export default async function City(req, res) {
    //console.log(req.query)
    try{
        await getCity(req.query?req.query.provinceId:'').then(response => {
            //console.log(response)
            res.status(200)
            res.send(response)
            res.end
        })
    } catch (e) {
        console.log(e)
    }
}