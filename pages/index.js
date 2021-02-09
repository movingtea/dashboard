import React, {useState} from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ProTip from '../components/ProTip';
import Link from '../components/Link';
import Copyright from '../components/Copyright';
import Header from "../components/Header/Header";
import {FormControl, Grid} from "@material-ui/core";
import styles from "../styles/Home.module.css";
import axios from "axios";

export default function Index() {
    const [provincesList, setProvincesList] = useState();
    const [citiesList, setCitiesList] = useState();
    const [dealersInformationList, setDealersInformationList] = useState();

    async function getProvincesList(provinceId) {
        const config = {
            url:'./api/dealers/province',
            params:{
                provinceId
            }
        }
        return await axios(config).then(response => {
            console.log(response.data)
            return response.data
        })
    }

    const provincesConfig = {
        url: './api/dealers/province'
    }

    return (
        <Header>
            <Grid item xs={2} className={styles.container}>
                <img src={'/vercel.svg'} className={styles.logo}/>
            </Grid>
            <Grid item xs={3} className={styles.container}>
                asdfasdf
            </Grid>
            <Grid item xs={3} className={styles.container}>
                asdfasdf
            </Grid>
            <Grid item xs={4} className={styles.container}>
                asdfasdf
            </Grid>
        </Header>
    );
}

export async function getStaticProps() {
    const getProvinces={
        url: 'http://localhost:3000/api/dealers/province'
    }

    const getCities = {
        url:'http://localhost:3000/api/dealers/city'
    }
    const provincesList = await axios(getProvinces).then(response =>{
        console.log('res.provinces',response.data)
        return response.data
    })

    const citiesList = await axios(getCities).then(response =>{
        console.log('res.cities',response.data)
        return response.data
    })
    return {
        props:{
            provincesList
        }
    }
}