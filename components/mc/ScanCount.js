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
    async function getData() {
        axios('.api/mooncake/scan_counts', {
            params:{
                rowsPerPage: rowsPerPage,
                page: page,
                offset: 0
            }
        }).then(response => {
            console.log(response);
            setScanCount(response)
            setIsLoading(false)
        })
    }

    if (isLoading) {
        return (<div>
            <CircularProgress classes={{root: classes.CircularProgress}} size={'5rem'}/>
        </div>)
    } else {
        return (
            <>
                {{scanCount}}
            </>
        )
    }

}