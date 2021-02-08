import { AppBar, Grid, makeStyles} from "@material-ui/core";
import styles from "./Header.module.css"


const useStyle = makeStyles({
    root:{
        marginLeft: '1em',
    }
})

export default function Header({children}) {
    const classes = useStyle()
    return (
        <AppBar className={styles.header}>
            <Grid container spacing={3} classes={{root: classes.root}}>
                {children}
            </Grid>
        </AppBar>
    )
}