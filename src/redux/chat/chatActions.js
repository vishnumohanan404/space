import {
  GET_USER_FRIENDS,
  MESSAGE_SENT,
  CLEAR_CONVERSATIONS,
  GET_MESSAGE,
  CLEAR_CHAT,
  SET_TOGGLE,
  SET_CONVO,
  SET_BUBBLE,
  SET_ACTIVE,
  UPDATE_ACTIVE_CONVO,
  SET_ACTIVE_CONVO,
  SET_MESSAGE
} from "./chatTypes";
import { api } from "../../api.config";

const getUserChatFriendsSuccess = (userFriends) => {
  return {
    type: GET_USER_FRIENDS,
    payload: userFriends,
  };
};

export const getUserChatFriends = () => {
  return async (dispatch) => {
    try {
      const userFriends = await api.get("/conversations");
      dispatch(getUserChatFriendsSuccess(userFriends.data));
    } catch (err) {
      console.log("Error in getUserChatFriends:", err);
    }
  };
};

export const clearConversations = () => {
  return {
    type: CLEAR_CONVERSATIONS,
  };
};

export const sendMessageSuccess = (message) => {
  return {
    type: MESSAGE_SENT,
    payload: message,
  };
};

export const setMessageSuccess = (message) => {
  return {
    type: SET_MESSAGE,
    payload: message,
  };
};


export const sendMessage = (text, convo, socket) => {
  return async (dispatch) => {
    try {
      const messageSent = await api.post(`/message`, {
        text,
        recipient: convo._id,
      });
      // console.log(`messageSent`, messageSent);
      dispatch(sendMessageSuccess(messageSent.data));
      socket.emit("MESSAGE_SENT", {...messageSent.data});
    } catch (err) {
      console.log("Error in sendMessage: ", err);
    }
  };
};

const getMessagesSuccess = (messages) => {
  return {
    type: GET_MESSAGE,
    payload: messages,
  };
};

export const getMessages = (convoId) => {
  return async (dispatch) => {
    try {
      const messages = await api.get(`message/${convoId}`);
      dispatch(getMessagesSuccess(messages.data));
    } catch (err) {
      console.log("Erron in get Message", err);
    }
  };
};

export const clearChat = () => {
  return {
    type: CLEAR_CHAT,
  };
};

export const setOpenChat = (toggle) => {
  return {
    type: SET_TOGGLE,
    payload: toggle,
  };
};

export const setConvo = (convo) => {
  return {
    type: SET_CONVO,
    payload: convo,
  };
};
export const setActiveInConvo = (convo) => {
  return {
    type: SET_ACTIVE_CONVO,
    payload: convo,
  };
};

export const updateActive = (convo) => {
  return {
    type: UPDATE_ACTIVE_CONVO,
    payload: convo,
  };
};

export const setOpenBubble = (openBubble) => {
  return {
    type: SET_BUBBLE,
    payload: openBubble,
  };
};
