export default {
  // Color Palette
  palette: {
    primary: {
      light: "#126180",
      main: "#126180",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff6333",
      main: "#ff3d00",
      dark: "#b22a00",
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
    visibleSeparator: {
      width: "100%",
      borderBottom: "1px solid rgba(0,0,0,0.1)",
      marginBottom: 20,
    },
    invisibleSeparator: {
      border: "none",
      margin: 4,
    },
  },
  paper: {
    padding: 20,
    width: "70%",
  },
  profile: {
    "& .imageWrapper": {
      position: "relative",
      textAlign: "center",
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
