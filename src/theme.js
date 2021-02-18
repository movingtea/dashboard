import {createMuiTheme} from '@material-ui/core/styles';
import {red} from '@material-ui/core/colors';
import {zhCN} from '@material-ui/core/locale';

// Create a theme instance.
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#3277D2',
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#fff',
        },
    },
}, zhCN);

export default theme;