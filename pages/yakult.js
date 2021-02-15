import Header from "../components/yakult/Header/Header";
import Head from "next/head";
import PropTypes from 'prop-types';
import styles from "../styles/yakult.module.css";
import React, {useState} from "react";
import {Container, Paper, Tab, Tabs} from "@material-ui/core";
import DataOverview from "../components/yakult/DataOverview/DataOverview";
import RewardsOverview from "../components/yakult/RewardsOverview/RewardsOverview";
import UserList from "../components/yakult/UserList/UserList";


function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <Container style={{padding: '0'}}>
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <div>{children}</div>
                )}
            </div>
        </Container>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function Yakult() {
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    return (
        <Container>
            <Head>
                <title>养乐多2021年春节活动数据后台</title>
            </Head>
            <Header/>
            <Tabs className={styles.tabs} onChange={handleChange} value={value} aria-label="simple tabs example"
                  variant="fullWidth" component={Paper}>
                <Tab label='首页' {...a11yProps(0)}/>
                <Tab label='扫码用户' {...a11yProps(1)}/>
                <Tab label='一等奖' {...a11yProps(2)}/>
                <Tab label='二等奖' {...a11yProps(3)}/>
                <Tab label='三等奖' {...a11yProps(4)}/>
                <Tab label='四等奖' {...a11yProps(5)}/>
            </Tabs>
            <TabPanel value={value} index={0} className={styles.tabPanel}>
                <DataOverview/>
                <RewardsOverview/>
            </TabPanel>
            <TabPanel value={value} index={1} className={styles.tabPanel}>
                <UserList/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                Item three
            </TabPanel>
            <TabPanel value={value} index={3}>
                Item 4
            </TabPanel>
            <TabPanel value={value} index={4}>
                Item 4
            </TabPanel>
            <TabPanel value={value} index={5}>
                Item 4
            </TabPanel>

        </Container>
    )
}