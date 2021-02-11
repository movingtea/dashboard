import React, {useEffect, useState} from 'react';
import ReplayIcon from '@material-ui/icons/Replay';
import Header from "../components/Header/Header";
import {
    Button,
    FormControl,
    Grid,
    InputLabel,
    makeStyles,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@material-ui/core";
import styles from "../styles/Home.module.css";
import axios from "axios";
import Head from "next/head";
import Router from "next/router";

const useStyle = makeStyles({
    InputLabelRoot: {
        color: '#FFF'
    },
    InputBaseRoot: {
        color: '#FFF'
    },
    ButtonRootLabel: {
        fontSize: '1.2em',
    },
});

const endpointDealerInfo = './api/dealers/dealer_info';
const endpointCity = './api/dealers/city';
const endpointProvince = './api/dealers/province'

export default function Index() {
    const classes = useStyle()
    const [provinces, setProvinces] = useState();
    const [selectedProvince, setSelectedProvince] = useState()
    const [selectedCity, setSelectedCity] = useState()
    const [cities, setCities] = useState();
    const [dealers, setDealers] = useState();
    const [isLoading, setIsLoading] = useState(true)

    async function getData() {
        const updateCity = axios(endpointCity)
        const updateDealers = axios(endpointDealerInfo)
        const updateProvinces = axios(endpointProvince)
        axios.all([updateCity, updateDealers, updateProvinces]).then(response => {
            //console.log('data', response[0].data)
            setCities(response[0].data)
            setDealers(response[1].data)
            setProvinces(response[2].data)
            setIsLoading(false)
        })
    }

    useEffect(() => {
        getData()
    }, [])

    async function handleProvinceChange(e) {
        const selectedValue = e.target.value
        setSelectedCity(undefined)
        setSelectedProvince(selectedValue)
        const updateCity = axios(endpointCity, {
            params: {
                provinceId: selectedValue
            }
        })
        const updateDealers = axios(endpointDealerInfo, {
            params: {
                provinceId: selectedValue
            }
        })
        await axios.all([updateCity, updateDealers]).then(response => {
            setCities(response[0].data)
            setDealers(response[1].data)
            //setIsLoading(false)
        })
    }

    async function handleCityChange(e) {
        const selectedValue = e.target.value
        console.log(selectedValue)
        setSelectedCity(selectedValue)
        await axios(endpointDealerInfo, {
            params: {
                cityId: selectedValue
            }
        }).then(response => {
            setDealers(response.data)
        })
    }

    async function handleClick() {
        getData()
        setSelectedProvince(undefined)
    }

    function logoClick(e) {
        e.preventDefault()
        Router.reload(window.location.pathname)
    }

    if (isLoading) {
        return <div>Loading...</div>
    } else {
        return (
            <>
                <Head>
                    <title>Title</title>
                </Head>
                <Header>
                    <Grid item xs={2} className={styles.container}>
                        <img src={'/vercel.svg'} className={styles.logo} onClick={logoClick}/>
                    </Grid>
                    <Grid item xs={3} className={styles.container}>
                        <FormControl className={styles.form}>
                            <InputLabel classes={{root: classes.InputLabelRoot}}
                                        id={'province-label'}>请选择省份</InputLabel>
                            <Select value={selectedProvince ? selectedProvince : provinces[0].id}
                                    classes={{root: classes.InputBaseRoot}} labelId={'province'}
                                    onChange={handleProvinceChange}>
                                {provinces.map(({id, province}) => (
                                    <MenuItem key={id} value={id}>{province}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3} className={styles.container}>
                        <FormControl className={styles.form}>
                            <InputLabel classes={{root: classes.InputLabelRoot}} id={'city'}>请选择城市</InputLabel>
                            <Select value={selectedCity ? selectedCity : cities[0].id}
                                    classes={{root: classes.InputBaseRoot}} labelId={'city'}
                                    onChange={handleCityChange}>
                                {cities.map(({id, city}) => (
                                    <MenuItem key={id} value={id}>{city}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4} className={styles.container}>
                        <Button variant="contained" className={styles.resetButton}
                                classes={{label: classes.ButtonRootLabel}} endIcon={<ReplayIcon/>}
                                onClick={handleClick}>重置</Button>
                    </Grid>
                </Header>
                <TableContainer className={styles.tableContainer}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell align={'center'}>省份</TableCell>
                                <TableCell align={'center'}>城市</TableCell>
                                <TableCell align={'center'}>地址</TableCell>
                                <TableCell align={'center'}>电话</TableCell>
                                <TableCell align={'center'}>营业时间</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dealers.map(({id, province, city, address, phone, biz_hour}) => (
                                <TableRow key={id} className={styles.tableContents}>
                                    <TableCell align={'center'}>{province}</TableCell>
                                    <TableCell align={'center'}>{city}</TableCell>
                                    <TableCell align={'center'}>{address}</TableCell>
                                    <TableCell align={'center'}>{phone}</TableCell>
                                    <TableCell align={'center'}>{biz_hour}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {/* <TablePagination count={} onChangePage={} page={} rowsPerPage={}/> */}
            </>
        )
    }


}