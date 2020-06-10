import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";

// Utlitiy
import ScreamSkeleton from "../util/ScreamSkeleton";
import ProfileSkeleton from "../util/ProfileSkeleton";

// Components
import Scream from "../components/scream/Scream";
import StaticProfile from "../components/profile/StaticProfile";

// MUI
import Grid from "@material-ui/core/Grid";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { getOtherUserData } from "../redux/actions/dataActions";

// This profile will be static. Thus, it is not stored in the global state.
const User = () => {
  const dispatch = useDispatch();
  const handle = useParams().handle;
  const screamId = useParams().screamId;
  const location = useLocation();
  const data = useSelector((state) => state.data);
  const screams = data.screams;
  const loading = data.loading;

  // State
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    dispatch(getOtherUserData(handle));
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        setProfile(res.data.user);
      })
      .catch((err) => console.log(err));
  }, [location]);

  // Renders
  const screamsMarkup = loading ? (
    <ScreamSkeleton />
  ) : screams === null ? (
    <p>User has not screamed yet</p>
  ) : !screamId ? (
    screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
  ) : (
    screams.map((scream) => {
      if (scream.screamId !== screamId) {
        return <Scream key={scream.screamId} scream={scream} />;
      } else {
        return <Scream key={scream.screamId} scream={scream} openDialog />;
      }
    })
  );

  // Reload profile only if user handle changes
  const profileMarkup =
    profile !== null && profile.handle === handle ? (
      <StaticProfile profile={profile} />
    ) : (
      <ProfileSkeleton />
    );

  return (
    <Grid container spacing={8}>
      <Grid item sm={4} xs={12}>
        {profileMarkup}
      </Grid>
      <Grid item sm={8} xs={12}>
        {screamsMarkup}
      </Grid>
    </Grid>
  );
};

export default User;
