import {
  GET_USER_FRIENDS,
  MESSAGE_SENT,
  CLEAR_CONVERSATIONS,
  GET_MESSAGE,
  CLEAR_CHAT,
  SET_CONVO,
  SET_TOGGLE,
  SET_BUBBLE,
  // SET_ACTIVE,
  SET_ACTIVE_CONVO,
  // SET_ACTIVE_INITIAL,
  SET_MESSAGE,
  UPDATE_ACTIVE_CONVO,
} from "./chatTypes";

const initialState = {
  online: [],
  friendsConversations: [],
  chat: [],
  conversation: null,
  openChat: false,
  openBubble: true,
  active: true,
};

const ChatReducer = (state = initialState, action) => {
  // console.log(`action.type outside`, action.type);
  switch (action.type) {
    case GET_USER_FRIENDS:
      return {
        ...state,
        friendsConversations: action.payload,
      };
    case CLEAR_CONVERSATIONS:
      return {
        ...state,
        friendsConversations: [],
      };
    case MESSAGE_SENT:
      return {
        ...state,
        chat: [action.payload, ...state.chat],
        friendsConversations: updateConversations(
          action.payload,
          state.friendsConversations
        ),
      };
    case GET_MESSAGE:
      return {
        ...state,
        chat: [...action.payload],
      };
    case SET_MESSAGE:
      return {
        ...state,
        chat: [action.payload, ...state.chat],
        friendsConversations: setConversations(
          action.payload,
          state.friendsConversations
        ),
      };
    case CLEAR_CHAT:
      return {
        ...state,
        chat: [],
      };
    case SET_CONVO:
      return {
        ...state,
        conversation: action.payload,
      };
    case SET_ACTIVE_CONVO:
      return {
        ...state,
        friendsConversations: updateActiveUsers(
          action.payload,
          state.friendsConversations
        ),
      };
      case UPDATE_ACTIVE_CONVO:
        return {
          ...state,
          friendsConversations: updateActiveUsers(
            action.payload,
            state.friendsConversations
          ),
        };
      
    case SET_TOGGLE:
      return {
        ...state,
        openChat: action.payload,
      };
    case SET_BUBBLE:
      return {
        ...state,
        openBubble: action.payload,
      };

    default:
      return state;
  }
};

export default ChatReducer;
const setConversations = (newMessage, convos) => {
  console.log(`newConvo`, newMessage);
  console.log(`convos`, convos);
  return convos.map((convo) => {
    if (convo.conversation) {
      return convo.conversation._id === newMessage.conversation
        ? {
            ...convo,
            conversation: {
              ...convo.conversation,
              text: newMessage.text,
              author: newMessage.sender,
            },
          }
        : convo;
    } else {
      return convo._id !== newMessage.sender
        ? convo
        : {
            ...convo,
            conversation: {
              ...newMessage,
              _id: newMessage.conversation,
              author: newMessage.sender,
            },
          };
    }
  });
};

const updateConversations = (newConvo, convos) => {
  return convos.map((convo) => {
    if (convo.conversation) {
      if (convo.conversation._id !== newConvo.conversation) {
        return convo;
      } else {
        return {
          ...convo,
          conversation: {
            ...convo.conversation,
            text: newConvo.text,
            author: newConvo.sender,
          },
        };
      }
    } else {
      // console.log(`convo._id`, convo._id);
      // console.log(`newConvo.recipent`, newConvo.recipient);
      if (convo._id === newConvo.recipient) {
        return {
          ...convo,
          conversation: {
            ...newConvo,
            _id: newConvo.conversation,
            author: newConvo.sender,
          },
        };
      } else {
        return convo;
      }
    }
  });
};

const updateActiveUsers = (newConvoUser, convos) => {
  return convos.map((convo) =>
    convo._id !== newConvoUser._id
      ? convo
      : { ...convo, active: newConvoUser.active }
  );
};
