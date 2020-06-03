import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
// import { connect } from "react-redux";
// import PropTypes from "prop-types";

const AuthRoute = ({ component: Component, ...rest }) => {
  let auth = useSelector((state) => state.user.authenticated);
  return (
    <Route
      {...rest}
      render={(props) =>
        auth === true ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};
// const mapStateToProps = (state) => ({
//   authenticated: state.user.authenticated,
// });

// AuthRoute.propTypes = {
//   user: PropTypes.object,
// };

// export default connect(mapStateToProps)(AuthRoute);
export default AuthRoute;
