import {AppBar, Button, Grid, makeStyles, Typography} from "@material-ui/core";
import styles from "./Header.module.css"
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import React from "react";


const useStyle = makeStyles({
    AppBarRoot: {
        left: "auto",
        right: "auto",
    },
    root: {
        marginLeft: '1em',
    },
    ButtonRootLable: {
        fontSize: '1.2em',
    },
})

export default function Header() {
    const classes = useStyle()
    return (
        <AppBar className={styles.header} classes={{root: classes.AppBarRoot}} position={"sticky"}>
            <Grid container spacing={3} classes={{root: classes.root}}>
                <Grid item xs={2} className={styles.logoContainer}>
                    <img src={'http://www.yakult.com.cn/images/logo.png'} className={styles.logo}/>
                </Grid>
                <Grid item xs={7} className={styles.container}>
                    <Typography variant={'h4'} component="h1">养乐多2021年春节活动数据后台</Typography>
                </Grid>
                <Grid item xs={2} className={styles.container}>
                    <Button variant={'contained'} className={styles.logoutButton}
                            classes={{label: classes.ButtonRootLabel}} endIcon={<ExitToAppIcon/>}>
                        退出登录
                    </Button>
                </Grid>
            </Grid>
        </AppBar>
    )
}