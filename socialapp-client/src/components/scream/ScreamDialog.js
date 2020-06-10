import React, { useState, useEffect, Fragment } from "react";
import Link from "react-router-dom/Link";
import dayjs from "dayjs";

// Utlity
import MyButton from "../../util/MyButton";

// Components
import LikeButton from "./LikeButton";
import Comments from "./Comments";
import CommentForm from "./CommentForm";

// MUI
import makeStyles from "@material-ui/core/styles/makeStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
// Icons
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import ChatIcon from "@material-ui/icons/Chat";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { getAScream, clearUIErrors } from "../../redux/actions/dataActions";

// Styles
const useStyles = makeStyles((customTheme) => ({
  ...customTheme.theme,
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: "50%",
    objectFit: "cover",
  },
  dialogContent: {
    padding: 20,
  },
  closeButton: {
    position: "absolute",
    left: "90%",
    [customTheme.breakpoints.down("sm")]: {
      left: "85%",
    },
  },
  expandButton: {
    position: "absolute",
    left: "90%",
    top: "70%",
  },
  loadingCircle: {
    textAlign: "center",
    marginTop: 50,
    marginBottom: 50,
  },
}));

const ScreamDialog = ({ screamId, userHandle, openDialog }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const ui = useSelector((state) => state.ui);
  const {
    body,
    created,
    userImage,
    likeCount,
    commentCount,
    comments,
  } = useSelector((state) => state.data.scream);

  // States
  const [open, setOpen] = useState(false);
  const [oldPath, setOldPath] = useState("");

  // If scream opened with scream url
  useEffect(() => {
    if (openDialog) {
      handleOpen();
    }
  }, []);

  // Handlers
  const handleOpen = () => {
    // Manipulate url
    const newPath = `/user/${userHandle}/scream/${screamId}`;
    if (window.location.pathname === newPath) {
      setOldPath(`/user/${userHandle}`);
    } else {
      setOldPath(`${window.location.pathname}`);
    }
    window.history.pushState(null, null, newPath);

    setOpen(true);
    dispatch(getAScream(screamId));
  };

  const handleClose = () => {
    window.history.pushState(null, null, oldPath);

    setOpen(false);
    dispatch(clearUIErrors());
  };

  // Render Scream Dialog with comments
  const dialogMarkUp = ui.loading ? (
    <div className={classes.loadingCircle}>
      <CircularProgress size={200} thickness={2} />
    </div>
  ) : (
    <Grid container spacing={2}>
      <Grid item sm={5}>
        <img src={userImage} alt="Profile" className={classes.profileImage} />
      </Grid>
      <Grid item sm={7}>
        <Typography
          component={Link}
          color="primary"
          variant="h5"
          to={`/user/${userHandle}`}
        >
          @{userHandle}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant="body2" color="textSecondary">
          {dayjs(created).format("h:mm a, DD MMM YYYY")}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant="body1">{body}</Typography>
        <LikeButton screamId={screamId} />
        <span>{likeCount} Likes</span>
        <MyButton tipTitle="comments">
          <ChatIcon color="primary" />
        </MyButton>
        <span>{commentCount} Comments</span>
      </Grid>
      <hr className={classes.visibleSeparator} />
      <CommentForm screamId={screamId} />
      <Comments comments={comments} />
    </Grid>
  );
  return (
    <Fragment>
      <MyButton
        onClick={handleOpen}
        tipTitle="Expand scream"
        tipClassName={classes.expandButton}
      >
        <UnfoldMore color="primary" />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <MyButton
          onClick={handleClose}
          tipTitle="Close"
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <DialogContent className={classes.dialogContent}>
          {dialogMarkUp}
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default ScreamDialog;
