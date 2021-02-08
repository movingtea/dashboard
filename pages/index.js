import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ProTip from '../components/ProTip';
import Link from '../components/Link';
import Copyright from '../components/Copyright';
import Header from "../components/Header/Header";
import {FormControl, Grid} from "@material-ui/core";
import styles from "../styles/Home.module.css"

export default function Index() {
    return (
        <Header>
            <Grid item xs={2} className={styles.container}>
                <img src={'/vercel.svg'} className={styles.logo}/>
            </Grid>
            <Grid item xs={3} className={styles.container}>
                asdfasdf
            </Grid>
            <Grid item xs={3} className={styles.container}>
                asdfasdf
            </Grid>
            <Grid item xs={4} className={styles.container}>
                asdfasdf
            </Grid>
        </Header>
    );
}

/* <Container maxWidth="sm">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Next.js example
          </Typography>
          <Link href="/about" color="secondary">
            Go to the about page
          </Link>
          <ProTip />
          <Copyright />
        </Box>
      </Container> */