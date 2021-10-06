import {
  GET_USER_FRIENDS,
  MESSAGE_SENT,
  CLEAR_CONVERSATIONS,
  GET_MESSAGE,
  CLEAR_CHAT,
  SET_CONVO,
  SET_TOGGLE,
  SET_BUBBLE,
  SET_ACTIVE,
  SET_ACTIVE_CONVO,
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
  console.log(`action.type outside`, action.type);
  switch (action.type) {
    case GET_USER_FRIENDS:
      return {
        ...state,
        friendsConversations: initialConversation(action.payload),
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
const initialConversation = (conversations) => {
  return conversations.map((convo) => ({ ...convo, active: convo.online }));  
};

const updateConversations = (newConvo, convos) => {
  console.log(`newConvo`, newConvo);
  console.log(`convos`, convos);
  return convos.map((convo) =>
    convo.conversation
      ? convo.conversation._id !== newConvo.conversation
        ? convo
        : {
            ...convo,
            conversation: {
              ...convo.conversation,
              text: newConvo.text,
              author: newConvo.sender,
            },
          }
      : convo._id === newConvo.recipent
      ? {
          ...convo,
          conversation: {
            ...newConvo,
            _id: newConvo.conversation,
            author: newConvo.sender,
          },
        }
      : convo
  );
};

const updateActiveUsers = (newConvoUser, convos) => {
  return convos.map((convo) =>
    convo._id !== newConvoUser._id
      ? convo
      : { ...convo, active: newConvoUser.active }
  );
};
