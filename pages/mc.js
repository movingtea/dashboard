import ScanCount from "../components/mc/ScanCount";
import {Container} from "@material-ui/core";
import Head from "next/head";
import React from "react";

export default function mcScanCount() {
    return (
        <Container>
            <Head>
                <title>养乐多2021年中秋活动数据</title>
            </Head>
            <ScanCount/>
        </Container>
    )
}