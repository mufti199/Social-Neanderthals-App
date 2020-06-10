import React, { useState, useEffect } from "react";

// MUI
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { submitComment } from "../../redux/actions/dataActions";

const useStyles = makeStyles((customTheme) => ({
  ...customTheme.theme,
}));

const CommentForm = ({ screamId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const ui = useSelector((state) => state.ui);
  const authenticated = useSelector((state) => state.user.authenticated);
  // States
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (ui.errors) {
      setErrors(ui.errors);
    }
  }, [ui.errors]);

  // Handlers
  const handleChange = (event) => {
    setBody(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(submitComment(screamId, { body }));
    setBody("");
  };

  // Render Comment Post Section
  const commentFormMarkup = authenticated ? (
    <Grid item sm={12} style={{ textAlign: "center" }}>
      <form onSubmit={handleSubmit}>
        <TextField
          name="body"
          type="text"
          label="Comment on scream"
          placeholder="SCREAM BACK!"
          error={errors.error ? true : false}
          helperText={errors.error}
          value={body}
          onChange={handleChange}
          fullWidth
          className={classes.textField}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Submit
        </Button>
      </form>
      <hr className={classes.visibleSeparator} />
    </Grid>
  ) : null;
  return commentFormMarkup;
};

export default CommentForm;
