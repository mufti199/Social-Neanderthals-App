import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid/";

// Utility
import ScreamSkeleton from "../util/ScreamSkeleton";

// Componenets
import Scream from "../components/scream/Scream";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { getScreams } from "../redux/actions/dataActions";

const Home = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  const screams = data.screams;

  // Fetching Screams from server
  useEffect(() => {
    dispatch(getScreams());
  }, []);

  let recentScreamsMarkup = !data.loading ? (
    screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
  ) : (
    <ScreamSkeleton />
  );

  return (
    <Grid
      container
      direction="column"
      justify="space-around"
      alignItems="center"
    >
      {recentScreamsMarkup}
    </Grid>
  );
};

export default Home;
