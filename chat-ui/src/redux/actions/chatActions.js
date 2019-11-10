import * as types from "./actionTypes";

export function addNewChat(chat) {
  return { type: types.ADD_NEW_CHAT_WINDOW, chat };
}

export function receiveNewMessage(message) {
  return { type: types.RECEIVE_NEW_MESSAGE, message };
}

export function sendNewMessage(message) {
  return { type: types.SEND_NEW_MESSAGE, message };
}
