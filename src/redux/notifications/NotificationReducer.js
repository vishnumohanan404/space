import {
  OPEN_NOTIFICATIONS_DD,
  CREATE_NOTIFICATION,
  SET_NOTIFY,
  READ_NOTIFY,
} from "./NotificationTypes";

const initialState = {
  dropdown: false,
  notifications: [],
};

const NotificationReducers = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_NOTIFICATIONS_DD:
      return {
        ...state,
        dropdown: action.payload,
      };
    case CREATE_NOTIFICATION:
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
      };
    case SET_NOTIFY:
      return {
        ...state,
        notifications: [...action.payload, ...state.notifications],
      };
    case READ_NOTIFY:
      return {
        ...state,
        notifications: state.notifications.map((notify) => {
          notify.read = true;
          return notify;
        }),
      };

    default:
      return state;
  }
};

export default NotificationReducers;
