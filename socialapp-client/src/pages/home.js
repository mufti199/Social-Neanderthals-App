import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid/";
import axios from "axios";
import Scream from "../components/Scream";

const Home = () => {
  const [screams, setScreams] = useState(null);

  // Fetching Screams from server
  useEffect(() => {
    let getScreams = async () => {
      axios
        .get("/screams")
        .then((res) => {
          console.log(res.data);
          setScreams(res.data);
        })
        .catch((err) => console.error(err));
    };
    getScreams();
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
        <p>Profile...</p>
      </Grid>
    </Grid>
  );
};

export default Home;
