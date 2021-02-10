import {getDealerInfo} from "../../../lib/dealers/dealers";

export default async function Dealer_info(req, res) {
    if (req.query.provinceId){
        try{
            await getDealerInfo(req.query.provinceId).then(response => {
                //console.log(response)
                res.status(200)
                res.send(response)
                res.end
            })
        } catch (e) {
            console.log(e)
        }
    } else if (req.query.cityId) {
        try{
            await getDealerInfo('',req.query.cityId).then(response => {
                //console.log(response)
                res.status(200)
                res.send(response)
                res.end
            })
        } catch (e) {
            console.log(e)
        }
    } else {
        try{
            await getDealerInfo().then(response => {
                //console.log(response)
                res.status(200)
                res.send(response)
                res.end
            })
        } catch (e) {
            console.log(e)
        }
    }

}