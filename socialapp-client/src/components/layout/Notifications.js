import React, { useState, Fragment } from "react";
import Link from "react-router-dom/Link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// MUI
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
//Icons
import NotificationsIcon from "@material-ui/icons/Notifications";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { markNotificationsRead } from "../../redux/actions/userActions";

const Notifications = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.user.notifications);
  const [anchorElement, setAnchorElement] = useState(null);
  dayjs.extend(relativeTime);

  // Handlers
  const handleOpen = (event) => {
    setAnchorElement(event.target);
  };

  const handleClose = (event) => {
    setAnchorElement(null);
  };

  const handleOnMenuOpened = () => {
    let unreadNotificationsIds = notifications
      .filter((notif) => !notif.read)
      .map((notif) => notif.notificationId);
    dispatch(markNotificationsRead(unreadNotificationsIds));
  };

  // Render Notifications Markup and Icon
  let notificationsMarkUp =
    notifications && notifications.length > 0 ? (
      notifications.map((notif) => {
        const verb = notif.type === "like" ? "liked" : "commented";
        const time = dayjs(notif.created).fromNow();
        const iconColor = notif.read ? "primary" : "secondary";
        const icon =
          notif.type === "like" ? (
            <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
          ) : (
            <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
          );
        return (
          <MenuItem key={notif.created} onClick={handleClose}>
            {icon}
            <Link to={`/user/${notif.recipient}/scream/${notif.screamId}`}>
              <Typography variant="body1">
                {notif.sender} {verb} {time}
              </Typography>
            </Link>
          </MenuItem>
        );
      })
    ) : (
      <MenuItem onClick={handleClose}>You have no notifications, yet</MenuItem>
    );

  let notificationsIcon;
  if (notifications && notifications.length > 0) {
    let unread = notifications.filter((notif) => notif.read === false).length;
    if (unread > 0) {
      console.log("badge");
      notificationsIcon = (
        <Badge badgeContent={unread} color="error">
          <NotificationsIcon />
        </Badge>
      );
    } else {
      notificationsIcon = <NotificationsIcon />;
    }
  } else {
    notificationsIcon = <NotificationsIcon />;
  }

  return (
    <Fragment>
      <Tooltip placement="top" title="Notifications">
        <IconButton
          aria-controls={anchorElement ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={handleOpen}
        >
          {notificationsIcon}
        </IconButton>
      </Tooltip>
      <Menu
        id="simple-menu"
        anchorEl={anchorElement}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        open={Boolean(anchorElement)}
        onClose={handleClose}
        onEntered={handleOnMenuOpened}
      >
        {notificationsMarkUp}
      </Menu>
    </Fragment>
  );
};

export default Notifications;
