import { createMuiTheme } from "@material-ui/core";

const Theme = createMuiTheme({
    palette: {
        primary: {
            main: "#284B63",
        },
        secondary: {
            main: "#D9D9D9",
        },
    },
    status: {
        danger: "#3C6E71",
    },
});

export default Theme;
