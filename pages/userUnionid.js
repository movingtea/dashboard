import React from "react";
import axios from "axios";
import fs from 'fs';


export default function UserUnionid({ unionids }) {
    let registrationDate = []
    let result = axios('./api/checkUserStatus', {
        params: {
            unionId: 'oSxo01cuh9qnQB19QWr5Yj5B-Fu4'
        }
    }).then(response => {
        return response
    })
    /*for (let i=0; i<unionids.length; i++) {
        let result = axios('./api/checkUserStatus', {
            params: {
                unionId: unionids[i]
            }
        }).then(response => {
            return response
        })
        registrationDate.push(result)
    } */

    return (
        <div>

            <img src={'/vercel.svg'}/>
            <ul>
                {
                    unionids.map((id) => (
                        <li>
                            {id}
                        </li>
                    ))
                }
            </ul>
        </div>


    )
}

export async function getStaticProps() {
    //const unionidList = fs.readdirSync(process.cwd() + '/public/datafile')
    //console.log(typeof unionidList)
    //console.log(unionidList[1].unionId)
    //console.log(typeof unionidList[1].unionId)
    //console.log(Object.values(unionidList)[0].unionId)
    const unionids = JSON.parse(fs.readFileSync(process.cwd() + '/public/idlist.json', "utf8"))
    return {
        props:{
            unionids
        }
    }
}