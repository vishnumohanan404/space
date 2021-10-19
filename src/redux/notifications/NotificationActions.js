import {
  OPEN_NOTIFICATIONS_DD,
  READ_NOTIFY,
  SET_NOTIFY,
} from "./NotificationTypes";
import { api } from "../../api.config";

export const openDropdown = (toggle) => {
  return {
    type: OPEN_NOTIFICATIONS_DD,
    payload: toggle,
  };
};

export const createNotifySuccess = (toggle) => {
  return {
    type: OPEN_NOTIFICATIONS_DD,
    payload: toggle,
  };
};

export const createNotify = ({ notify, socket }) => {
  return async (dispatch) => {
    try {
      const notifyObj = await api.post(`/notify`, notify);
      console.log(`notify`, notifyObj.data);
      socket.emit("SEND_NOTIFICATION", notifyObj.data);
    } catch (err) {
      console.log(`err.message`, err.message);
    }
  };
};

export const setNotify = (newNotify) => {
  return {
    type: SET_NOTIFY,
    payload: newNotify,
  };
};

export const getNotify = () => {
  return async (dispatch) => {
    try {
      const notifyObj = await api.get(`/notify`);
      dispatch(setNotify(notifyObj.data));
      //   socket.emit("SEND_NOTIFICATION",notify.data)
    } catch (err) {
      console.log(`err.message`, err.message);
    }
  };
};

export const readNotifications = () => {
  return async (dispatch) => {
    try {
      dispatch(readNotify());
      await api.patch(`/notify`);
      //   socket.emit("SEND_NOTIFICATION",notify.data)
    } catch (err) {
      console.log(`err.message`, err.message);
    }
  };
};

export const readNotify = (newNotify) => {
  return {
    type: READ_NOTIFY,
  };
};
