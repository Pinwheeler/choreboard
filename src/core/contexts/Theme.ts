import { createTheme, ThemeOptions } from "@mui/material/styles";

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: "#77a1b7",
      light: "#c9d9e2",
    },
    secondary: {
      main: "#3f672c",
    },
    divider: "rgba(0, 0, 0, 0.2)",
  },
};

export const Theme = createTheme(themeOptions);
