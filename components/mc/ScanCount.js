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
import ShowChartIcon from '@material-ui/icons/ShowChart';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import TableChartIcon from '@material-ui/icons/TableChart';
import styles from "../yakult/UserList/UserList.module.css";

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

export default function ScanCount() {
    const classes = useStyle();
    const [scanCount, setScanCount] = useState()
    const [isLoading, setIsLoading] = useState(true);
    const [rowsPerPage, setRowsPerPage] = useState(50)
    const [page, setPage] = useState(0)
    const [totalPage, setTotalPage] = useState()

    async function getData() {
        axios('api/mc/scan_counts', {
            params: {
                rowsPerPage: rowsPerPage,
                page: page,
                offset: 0
            }
        }).then(response => {
            setScanCount(response.data.data);
            setTotalPage(response.data.meta.pageCount)
            setIsLoading(false)
        })
    }

    async function handleChangePage(event, newPage) {
        setIsLoading(true)
        console.log(newPage)
        setPage(newPage);
        await axios('api/mc/scan_counts', {
            params: {
                rowsPerPage: rowsPerPage,
                page: newPage,
                offset: rowsPerPage * (newPage - 1)
            }
        }).then(response => {
            //console.log(response)
            setTotalPage(response.data.meta.pageCount)
            setScanCount(response.data.data)
            setIsLoading(false)
        })
        console.log(scanCount)
    }

    async function handleChangeRowsPerPage(event) {
        setIsLoading(true)
        setRowsPerPage(parseInt(event.target.value, 10));
        await axios('api/mc/scan_counts', {
            params: {
                rowsPerPage: rowsPerPage,
                page: page,
                offset: 0
            }
        }).then(response => {
            setTotalPage(response.data.meta.pageCount)
            setScanCount(response.data.data);
            setIsLoading(false)
        })
    }

    useEffect(() => {
        getData().then(r => {
            console.log('scanCount', scanCount)
        })
    }, [])



    if (isLoading) {
        return (
            <div>
                <CircularProgress classes={{root: classes.CircularProgress}} size={'5rem'}/>
            </div>
        )
    } else {
        return (
            <>
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
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell classes={{root: classes.TableCellBorder}}>id</TableCell>
                                <TableCell classes={{root: classes.TableCellBorder}}>昵称</TableCell>
                                <TableCell classes={{root: classes.TableCellBorder}}>OpenId</TableCell>
                                <TableCell classes={{root: classes.TableCellBorder}}>扫码次数</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {scanCount.map(({id, nickname, open_id, scanned_times}) => (
                                <TableRow key={id}>
                                    <TableCell classes={{root: classes.DataCell}}>{id}</TableCell>
                                    <TableCell classes={{root: classes.DataCell}}>{nickname}</TableCell>
                                    <TableCell classes={{root: classes.DataCell}}>{open_id}</TableCell>
                                    <TableCell classes={{root: classes.DataCell}}>{scanned_times}</TableCell>
                                </TableRow>))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        )
    }

}