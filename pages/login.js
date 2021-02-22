import Head from 'next/head';
import styles from '../styles/login.module.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {useState} from "react";
import {makeStyles} from "@material-ui/core";

const useStyle = makeStyles({
    root: {
        border: 0,
        margin: 0,
        display: 'inline-flex',
        padding: 0,
        position: 'relative',
        minWidth: '205px',
    }
})

export default function Home() {
    const classes = useStyle();
    const [values, setValues] = useState({
        userName: '',
        password: '',
    })

    const handleChange = (prop) => (event) => {
        setValues({
            ...values,
            [prop]: event.target.value
        })
    }

    const [remember, setRemember] = useState(false);
    console.log('before', !remember);
    const toggle = _ => {
        if (!remember) {
            setRemember(true);
        } else {
            setRemember(false);
        }
    }
    console.log('after', remember);
    return (

        <>
            <Head>
                <title>This is my playground</title>
            </Head>
            <div className={styles.container}>
                <div className={styles.login_panel}>
                    <div className={styles.login_title}>
                        登录
                    </div>
                    <form className={styles.login_form}>
                        <TextField
                            classes={{root: classes.root}}
                            className={styles.input_field}
                            id={'userName'}
                            label={'用户名'}
                            style={{marginTop: '1em'}}
                            value={values.userName}
                            onChange={handleChange('userName')}
                        />
                        <TextField
                            classes={{root: classes.root}}
                            className={styles.input_field}
                            id={'password'}
                            type={'password'}
                            label={'密码'}
                            style={{marginTop: '1em'}}
                            value={values.password}
                            onChange={handleChange('password')}
                        />
                    </form>
                    <div className={styles.switch_container}>
                        <FormControlLabel
                            control={
                                <Switch onChange={toggle}/>
                            }
                            label={
                                <p style={{fontFamily: 'sans-serif'}}>记住密码</p>
                            }
                        />
                    </div>
                    <div className={styles.button_container}>
                        <Button className={styles.login_button} variant={'contained'} color={'primary'}
                        >登录</Button>
                    </div>
                </div>
            </div>
        </>
    )
}
