import {makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import axios from "axios";
import styles from "./RewardsOverview.module.css";

const useStyle = makeStyles({
    TableHeaderCell: {
        textAlign: "center"
    },
    DataCell: {
        textAlign: 'center',
        fontSize: '1.5rem',
        fontWeight: '900',
        borderBottom: "none",
    }
})

export default function RewardsOverview() {
    const classes = useStyle();
    const [isLoading, setIsLoading] = useState(true)
    const [rewardsInfo, setRewardsInfo] = useState([])

    async function getRewardsInfo() {
        await axios('./api/yakult/rewardsinfo').then(response => {
            setRewardsInfo(response.data.rewards)
            setIsLoading(false)
        })
    }

    useEffect(() => {
        getRewardsInfo()
    }, [])

    if (isLoading) {
        return (<div></div>)
    }

    return (
        <TableContainer component={Paper} className={styles.container}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell classes={{root: classes.TableHeaderCell}}>名称</TableCell>
                        <TableCell classes={{root: classes.TableHeaderCell}}>已发放数量</TableCell>
                        <TableCell classes={{root: classes.TableHeaderCell}}>剩余数量</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rewardsInfo.map(({id, name, quantity, given}) => (
                        <TableRow key={id}>
                            <TableCell classes={{root: classes.DataCell}}>{name}</TableCell>
                            <TableCell classes={{root: classes.DataCell}}>{given}</TableCell>
                            <TableCell classes={{root: classes.DataCell}}>{quantity}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}