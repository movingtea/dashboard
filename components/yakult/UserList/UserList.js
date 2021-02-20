import {
    CircularProgress,
    Collapse,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
    useTheme
} from "@material-ui/core";
import Pagination from '@material-ui/lab/Pagination';
import React, {useEffect, useState} from "react";
import axios from "axios";
import styles from './UserList.module.css';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import {Line} from "react-chartjs-2";
import ShowChartIcon from '@material-ui/icons/ShowChart';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import TableChartIcon from '@material-ui/icons/TableChart';
//import TablePaginationActions from "@material-ui/core/TablePagination/TablePaginationActions";


const useStyle = makeStyles({
    TableCellBorder: {
        textAlign: "center",
        fontSize: '1rem',
        fontWeight: '900'
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
    }
})

const useStyles1 = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
}));

export default function UserList() {
    function TablePaginationActions(props) {
        const classes = useStyles1();
        const theme = useTheme();
        const {count, page, rowsPerPage, onChangePage} = props;

        const handleFirstPageButtonClick = (event) => {
            onChangePage(event, 0);
        };

        const handleBackButtonClick = (event) => {
            onChangePage(event, page - 1);
        };

        const handleNextButtonClick = (event) => {
            onChangePage(event, page + 1);
        };

        const handleLastPageButtonClick = (event) => {
            onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
        };

        return (
            <div className={classes.root}>
                <IconButton
                    onClick={handleFirstPageButtonClick}
                    disabled={page === 0}
                    aria-label="first page"
                >
                    {theme.direction === 'rtl' ? <LastPageIcon/> : <FirstPageIcon/>}
                </IconButton>
                <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                    {theme.direction === 'rtl' ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
                </IconButton>
                <IconButton
                    onClick={handleNextButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="next page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
                </IconButton>
                <IconButton
                    onClick={handleLastPageButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="last page"
                >
                    {theme.direction === 'rtl' ? <FirstPageIcon/> : <LastPageIcon/>}
                </IconButton>
            </div>
        );
    }

    const classes = useStyle();
    const [userList, setUserList] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [rowsPerPage, setRowsPerPage] = useState(20)
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
                page: page + 1
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

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        console.log(page)
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        //getChartData()
        getData()
    }, [])

    if (isLoading) {
        return (<div>
            <CircularProgress classes={{root: classes.CircularProgress}} size={'5rem'}/>
        </div>)
    } else {
        const rows = userList.map(({id, avatar, nickname, open_id, code, reward_name, status, created_at}) => (
            <TableRow key={id}>
                <TableCell classes={{root: classes.DataCell}}>
                    <img src={avatar} className={styles.avatar} alt={'微信头像'}/>
                </TableCell>
                <TableCell classes={{root: classes.DataCell}}>{nickname}</TableCell>
                <TableCell classes={{root: classes.DataCell}}>{open_id}</TableCell>
                <TableCell classes={{root: classes.DataCell}}>{code}</TableCell>
                <TableCell classes={{root: classes.DataCell}}>{created_at}</TableCell>
                <TableCell classes={{root: classes.DataCell}}>{reward_name}</TableCell>
                <TableCell classes={{root: classes.DataCell}}>
                <span
                    className={`${styles.status} ${status === '未抽奖' ? styles.notStarted : (status === '未完成' ? styles.notClaimed : styles.sent)}`}>
                    {status}
                </span>
                </TableCell>
            </TableRow>
        ))
        return (
            <>
                <List component={Paper}>
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

                <List component={Paper} classes={{root: classes.UserListContainer}}>
                    <ListItem button onClick={handleExpandTable}>
                        <ListItemIcon>
                            <TableChartIcon/>
                        </ListItemIcon>
                        <ListItemText primary={'扫码用户列表'}/>
                        {openTable ? <ExpandMore/> : <ExpandLess/>}
                    </ListItem>
                    {!openTable ? <Divider/> : <></>}
                    <Collapse in={!openTable} timeout={'auto'} unmountOnExit>
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
                                    {(rowsPerPage > 0 ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : rows)}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TablePagination
                                            rowsPerPageOptions={[20, 30, 50, {label: '全部', value: -1}]}
                                            colSpan={7}
                                            count={userList.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            SelectProps={{
                                                inputProps: {'aria-label': '每页显示'},
                                                native: true,
                                            }}
                                            onChangePage={handleChangePage}
                                            onChangeRowsPerPage={handleChangeRowsPerPage}
                                            ActionsComponent={TablePaginationActions}
                                        />
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </TableContainer>
                        <Pagination count={totalPage} shape={'rounded'}/>
                    </Collapse>
                </List>
            </>
        )
    }
}
