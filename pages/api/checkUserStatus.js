import axios from "axios";
import sha1 from 'js-sha1'

export default async function CheckUserStatus(req, res) {
    function generateEZRSignature() {
        const appId = 'GL';
        const token = 'b97c8552fbac2d07750f35087ab583d1';
        const appSystem = 'Xmas';
        const now = new Date();
        const timestamp = '' +
            now.getFullYear() +
            String(now.getMonth() + 1).padStart(2, '0') +
            String(now.getDate()).padStart(2, '0') +
            String(now.getHours()).padStart(2, '0') +
            String(now.getMinutes()).padStart(2, '0') +
            String(now.getSeconds()).padStart(2, '0')
        ;
        let signature = 'AppId=' + appId + '&Timestamp=' + timestamp + '&Token=' + token;
        signature = toUTF8Array(signature);
        signature = sha1(signature).toUpperCase();
        return {AppId: appId, Timestamp: timestamp, Sign: signature, AppSystem: appSystem};
    }

    function toUTF8Array(str) {
        let utf8 = [];
        for (let i = 0; i < str.length; i++) {
            let charcode = str.charCodeAt(i);
            if (charcode < 0x80) utf8.push(charcode);
            else if (charcode < 0x800) {
                utf8.push(0xc0 | (charcode >> 6),
                    0x80 | (charcode & 0x3f));
            } else if (charcode < 0xd800 || charcode >= 0xe000) {
                utf8.push(0xe0 | (charcode >> 12),
                    0x80 | ((charcode >> 6) & 0x3f),
                    0x80 | (charcode & 0x3f));
            }
            // surrogate pair
            else {
                i++;
                // UTF-16 encodes 0x10000-0x10FFFF by
                // subtracting 0x10000 and splitting the
                // 20 bits of 0x0-0xFFFFF into two halves
                charcode = 0x10000 + (((charcode & 0x3ff) << 10)
                    | (str.charCodeAt(i) & 0x3ff));
                utf8.push(0xf0 | (charcode >> 18),
                    0x80 | ((charcode >> 12) & 0x3f),
                    0x80 | ((charcode >> 6) & 0x3f),
                    0x80 | (charcode & 0x3f));
            }
        }
        return utf8;
    }

    let data = generateEZRSignature()
    data.Args = JSON.stringify({WxUnionID: req.query.unionId})
    console.log(data)
    try {
        const result = await axios.post('https://open-tp.ezrpro.com/api/cvip/vipget', {
            data
        }).then(res => {
            console.log('res', res)
            return res
        })
        res.status(200)
        res.send({
            data: result,
        })
        res.end
    } catch (error) {
        //console.log('error', error)
    }
}