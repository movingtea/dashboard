import {
    CircularProgress,
    Collapse,
    Divider, FormControl, Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles, MenuItem,
    Paper, Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, Typography,
} from "@material-ui/core";
import Pagination from '@material-ui/lab/Pagination';
import React, {useEffect, useState} from "react";
import axios from "axios";
import styles from './UserList.module.css';
import {Line} from "react-chartjs-2";
import ShowChartIcon from '@material-ui/icons/ShowChart';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import TableChartIcon from '@material-ui/icons/TableChart';

const useStyle = makeStyles({
    TableCellBorder: {
        textAlign: "center",
        fontSize: '1rem',
        fontWeight: '900'
    },
    padding: {
        padding: 0
    },
    DataCell: {
        textAlign: 'center',
        fontSize: '1rem',
        fontWeight: '400',
    },
    CircularProgress: {
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'block',
        marginTop: '10px'
    },
    UserListContainer: {
        marginTop: '20px',
        marginBottom: '20px'
    },
    PaginationContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    RightAlign: {
        marginLeft: 'auto',
        marginRight: '0'
    },
    Pagination: {
        width: '100%',
        margin: '0 0 auto'
    },
})


export default function UserList() {
    const classes = useStyle();
    const [userList, setUserList] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [rowsPerPage, setRowsPerPage] = useState(50)
    const [page, setPage] = useState(0)
    const [date, setDate] = useState()
    const [scanCount, setScanCount] = useState()
    const [totalPage, setTotalPage] = useState()
    const [openChart, setOpenChart] = useState(true)
    const [openTable, setOpenTable] = useState(true)

    function handleExpandChart() {
        setOpenChart(!openChart)
    }

    function handleExpandTable() {
        setOpenTable(!openTable)
    }


    async function getData() {
        const getUserData = axios('./api/yakult/userinfo', {
            params: {
                rowsPerPage: rowsPerPage,
                page: page,
                offset: 0,
            }
        })
        const getDailyScan = axios('./api/yakult/charts')
        axios.all([getUserData, getDailyScan]).then(response => {
            setUserList(response[0].data.data)
            setDate(response[1].data.labels)
            setScanCount(response[1].data.counts)
            setTotalPage(response[0].data.meta.pageCount)
            setIsLoading(false)
        })
    }

    const chartData = {
        labels: date,
        datasets: [
            {
                label: '每日扫码次数',
                data: scanCount,
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            }
        ]
    }

    const chartOptions = {
        legend: {
            position: 'bottom',
        },
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    }

    async function handleChangePage(event, newPage) {
        setIsLoading(true)
        console.log(newPage)
        setPage(newPage);
        await axios('./api/yakult/userinfo', {
            params: {
                rowsPerPage: rowsPerPage,
                page: newPage,
                offset: rowsPerPage * (newPage - 1)
            }
        }).then(response => {
            //console.log(response)
            setTotalPage(response.data.meta.pageCount)
            setUserList(response.data.data)
            setIsLoading(false)
        })
        console.log(userList)
    }

    async function handleChangeRowsPerPage(event) {
        setIsLoading(true)
        setRowsPerPage(parseInt(event.target.value, 10));
        await axios('./api/yakult/userinfo', {
            params: {
                rowsPerPage: event.target.value,
                page: page,
                offset: 0
            }
        }).then(response => {

            setTotalPage(response.data.meta.pageCount)
            setUserList(response.data.data)
            setIsLoading(false)
        })
        //setPage(0);
    }


    useEffect(() => {
        //getChartData()
        getData()
    }, [])

    if (isLoading) {
        return (<div>
            <CircularProgress classes={{root: classes.CircularProgress}} size={'5rem'}/>
        </div>)
    } else {
        return (
            <>
                <List component={Paper} classes={{padding: classes.padding}}>
                    <ListItem button onClick={handleExpandChart}>
                        <ListItemIcon>
                            <ShowChartIcon/>
                        </ListItemIcon>
                        <ListItemText primary={'每日扫码次数'}/>
                        {openChart ? <ExpandLess/> : <ExpandMore/>}
                    </ListItem>
                    <Collapse in={openChart} timeout={'auto'} unmountOnExit>
                        <Line data={chartData} options={chartOptions}/>
                    </Collapse>
                </List>
                <List component={Paper} classes={{root: classes.UserListContainer, padding: classes.padding}}>
                    <ListItem button onClick={handleExpandTable}>
                        <ListItemIcon>
                            <TableChartIcon/>
                        </ListItemIcon>
                        <ListItemText primary={'扫码用户列表'}/>
                        {openTable ? <ExpandMore/> : <ExpandLess/>}
                    </ListItem>
                    {!openTable ? <Divider/> : <></>}
                    <Collapse in={!openTable} timeout={'auto'} unmountOnExit>
                        <ListItem classes={{root: classes.PaginationContainer}}>
                            <Grid container spacing={2} classes={{root: classes.Pagination}}>
                                <Grid item xs={4} classes={{root: classes.PaginationContainer}}>
                                    <Typography>每页显示 </Typography>
                                    <FormControl className={styles.form}>
                                        <Select value={rowsPerPage} onChange={handleChangeRowsPerPage}>
                                            <MenuItem value={50}>50</MenuItem>
                                            <MenuItem value={100}>100</MenuItem>
                                            <MenuItem value={200}>200</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <Typography> 条数据</Typography>
                                </Grid>
                                <Grid item xs={3} classes={{root: classes.PaginationContainer}}>

                                </Grid>
                                <Grid item xs={5}>
                                    <Pagination count={totalPage} shape={'rounded'} page={page}
                                                classes={{root: classes.PaginationContainer, ul: classes.RightAlign}}
                                                onChange={handleChangePage}
                                    />
                                </Grid>
                            </Grid>
                        </ListItem>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell classes={{root: classes.TableCellBorder}}>头像</TableCell>
                                        <TableCell classes={{root: classes.TableCellBorder}}>昵称</TableCell>
                                        <TableCell classes={{root: classes.TableCellBorder}}>OpenId</TableCell>
                                        <TableCell classes={{root: classes.TableCellBorder}}>QR 码</TableCell>
                                        <TableCell classes={{root: classes.TableCellBorder}}>扫码时间</TableCell>
                                        <TableCell classes={{root: classes.TableCellBorder}}>奖励</TableCell>
                                        <TableCell classes={{root: classes.TableCellBorder}}>状态</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {userList.map(({id, avatar, nickname, open_id, code, reward_name, status, scanned_at}) => (
                                        <TableRow key={id}>
                                            <TableCell classes={{root: classes.DataCell}}>
                                                <img src={avatar} className={styles.avatar} alt={'微信头像'}/>
                                            </TableCell>
                                            <TableCell classes={{root: classes.DataCell}}>{nickname}</TableCell>
                                            <TableCell classes={{root: classes.DataCell}}>{open_id}</TableCell>
                                            <TableCell classes={{root: classes.DataCell}}>{code}</TableCell>
                                            <TableCell classes={{root: classes.DataCell}}>{scanned_at}</TableCell>
                                            <TableCell classes={{root: classes.DataCell}}>{reward_name}</TableCell>
                                            <TableCell classes={{root: classes.DataCell}}>
                                                <span
                                                    className={`${styles.status} ${status === '未抽奖' ? styles.notStarted : (status === '未完成' ? styles.notClaimed : styles.sent)}`}>
                                                    {status}
                                                </span>
                                            </TableCell>
                                        </TableRow>))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Grid container spacing={2} classes={{root: classes.Pagination}}>
                            <Grid item xs={4} classes={{root: classes.PaginationContainer}}>
                                <Typography>每页显示 </Typography>
                                <FormControl className={styles.form}>
                                    <Select value={rowsPerPage} onChange={handleChangeRowsPerPage}>
                                        <MenuItem value={50}>50</MenuItem>
                                        <MenuItem value={100}>100</MenuItem>
                                        <MenuItem value={200}>200</MenuItem>
                                    </Select>
                                </FormControl>
                                <Typography> 条数据</Typography>
                            </Grid>
                            <Grid item xs={3} classes={{root: classes.PaginationContainer}}>

                            </Grid>
                            <Grid item xs={5}>
                                <Pagination count={totalPage} shape={'rounded'} page={page}
                                            classes={{root: classes.PaginationContainer, ul: classes.RightAlign}}
                                            onChange={handleChangePage}
                                />
                            </Grid>
                        </Grid>

                    </Collapse>
                </List>
            </>
        )
    }
}
