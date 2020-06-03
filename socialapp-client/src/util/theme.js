export default {
  // Color Palette
  palette: {
    primary: {
      light: "#3385c6",
      main: "#3385c6",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#FFFFDB",
      dark: "#ba000d",
      contrastText: "#fff",
    },
  },
  typography: {
    useNextVariants: true,
  },
  // Login and Signup Theme
  theme: {
    form: {
      textAlign: "center",
    },
    pageTitle: {
      margin: "10px auto 10px auto",
    },
    image: {
      borderRadius: 10,
      width: "20%",
      margin: "20px auto 10px auto",
    },
    textField: {
      margin: "10px auto 10px auto",
    },
    button: {
      marginTop: "10px",
      position: "relative",
    },
    customError: {
      color: "red",
      fontSize: "0.8rem",
      marginTop: "5px",
    },
    progress: {
      position: "absolute",
    },
  },
  paper: {
    padding: 20,
  },
  profile: {
    "& .imageWrapper": {
      position: "relative",
      textAlign: "center",
      "& button": {
        position: "absolute",
        top: "80%",
        left: "70%",
      },
    },
    "& .profileImage": {
      width: 200,
      height: 200,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadius: "50%",
    },
    "& .profileDetails": {
      textAlign: "center",
      "& span, svg, a": {
        verticalAlign: "middle",
      },
      "& a": {
        color: "#3385c6",
      },
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0",
    },
    "& svg.button": {
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
  buttons: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px",
    },
  },
};
