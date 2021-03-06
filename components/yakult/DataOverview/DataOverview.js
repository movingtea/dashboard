import {
    CircularProgress,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import axios from "axios";


const useStyle = makeStyles({
    TableCellBorder: {
        borderBottom: "none",
        textAlign: "center"
    },
    DataCell: {
        textAlign: 'center',
        fontSize: '1.5rem',
        fontWeight: '900',
    },
    CircularProgress: {
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'block',
        marginTop: '10px'
    }
})

export default function DataOverview() {
    const classes = useStyle();
    const [totalUserCount, setTotalUserCount] = useState();
    const [totalUsedCodeCount, setTotalUsedCodeCount] = useState()
    const [totalRewardsClaimed, setTotalRewardsClaimed] = useState()
    const [totalRewardsSent, setTotalRewardsSent] = useState()
    const [averageTime, setAverageTime] = useState()
    const [isLoading, setIsLoading] = useState(true);

    async function getData() {
        axios('./api/yakult/data-overview').then(response => {
            setAverageTime(response.data.avgTime)
            setTotalUserCount(response.data.userCount)
            setTotalUsedCodeCount(response.data.usedQRCodesCount)
            setTotalRewardsSent(response.data.sentRewards)
            setTotalRewardsClaimed(response.data.claimedRewards)
            setIsLoading(false)
        })
    }

    useEffect(() => {
        getData()
    }, [])

    if (isLoading) {
        return (<div>
            <CircularProgress classes={{root: classes.CircularProgress}} size={'5rem'}/>
        </div>)
    } else {
        return (
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell classes={{root: classes.TableCellBorder}}>用户</TableCell>
                            <TableCell classes={{root: classes.TableCellBorder}}>扫码次数</TableCell>
                            <TableCell classes={{root: classes.TableCellBorder}}>奖励发放数量</TableCell>
                            <TableCell classes={{root: classes.TableCellBorder}}>领取奖励人数</TableCell>
                            <TableCell classes={{root: classes.TableCellBorder}}>完成率</TableCell>
                            <TableCell classes={{root: classes.TableCellBorder}}>用户平均停留时间</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell classes={{root: classes.DataCell}}>{totalUserCount}</TableCell>
                            <TableCell classes={{root: classes.DataCell}}>{totalUsedCodeCount}</TableCell>
                            <TableCell classes={{root: classes.DataCell}}>{totalRewardsSent}</TableCell>
                            <TableCell classes={{root: classes.DataCell}}>{totalRewardsClaimed}</TableCell>
                            <TableCell
                                classes={{root: classes.DataCell}}>{totalUserCount ? (totalRewardsClaimed / totalUsedCodeCount).toFixed(4) * 100 : 0}%</TableCell>
                            <TableCell classes={{root: classes.DataCell}}>{averageTime} 秒</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
}


