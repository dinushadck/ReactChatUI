import * as types from "../actions/actionTypes";

export default function chatReducer(state = [], action) {
  switch (action.type) {
    case types.ADD_NEW_CHAT_WINDOW:
      return [...state, { ...action.chat }];
    case types.SEND_NEW_MESSAGE:
        {
          if(action.message.from){
            let newState = state.map(item => {
              if(item.remoteId === action.message.to){
                return {...item, messages: [...item.messages, {from:action.message.from, to:action.message.to, content:action.message.content}]};                
              }
            });
  
            return newState;
  
          }else{
            return state;
          }
        }
    case types.RECEIVE_NEW_MESSAGE:
      {
        if(action.message.from){
          let newState = state.map(item => {
            if(item.remoteId === action.message.from){
              return {...item, messages: [...item.messages, {from:action.message.from, to:action.message.to, content:action.message.content}]};
            }
          });

          return newState;

        }else{
          return state;
        }
      }
    default:
      return state;
  }
}