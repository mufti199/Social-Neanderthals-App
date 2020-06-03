import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid/";

// Componenets
import Scream from "../components/Scream";
import Profile from "../components/Profile";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { getScreams } from "../redux/actions/dataActions";

const Home = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  const screams = data.screams;

  // Fetching Screams from server
  useEffect(() => {
    console.log("getscreams!");
    dispatch(getScreams());
  }, []);

  let recentScreamsMarkup = screams ? (
    screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
  ) : (
    <p>Loading...</p>
  );

  return (
    <Grid container spacing={4} justify="space-around">
      <Grid item xs={6}>
        {recentScreamsMarkup}
      </Grid>
      <Grid item xs={4}>
        <Profile />
      </Grid>
    </Grid>
  );
};

export default Home;
