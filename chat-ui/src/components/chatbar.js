import React, { useEffect } from 'react';
import { connect } from "react-redux";
import * as chatActions from "../redux/actions/chatActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import ChatBox from './chatbox';
import { sendMessage, registerCallBack } from "../socket";
import { updateEventListners, sendChatMessage } from "../socket/channelConnection";

function ChatBar(props) {

  let onChat = function onChatReceived(message) {
    //notify action creator
    props.chat_actions.receiveNewMessage({ from: message.from, to: message.to, content: message.content })

  }

  useEffect(() => {

    function onMessage(message) {
      //handle message
      props.chat_actions.receiveNewMessage({ from: message.from.name, to: message.to.name, content: message.content })
    };

    function onStatusReceived(message) {
      //handle message
    };

    const chatEventHandlers = {
      chat_received: onMessage,
      chat_status_received: onStatusReceived
    }
    updateEventListners(chatEventHandlers);

  }, [])



  let sendMessageViaSocket = function (from, to, content) {
    props.chat_actions.sendNewMessage({ from: from, to: to, content: content })
    //sendMessage(from, to, content);

    let user = {
      from: {
        id: from,
        name: from
      },
      to: {
        id: to,
        name: to
      }
    };

    sendChatMessage(2, user, content);

  }

  //registerCallBack(onChat);

  return (
    <div className="container-fluid row">
      {props.chats.map(chat => (
        <div key={chat.remoteId} className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
          <ChatBox chat={chat} onsend={sendMessageViaSocket} />
        </div>
      ))}

    </div>
  );
}

ChatBar.propTypes = {
  chats: PropTypes.array.isRequired,
  chat_actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    chats: state.chats
  };
}

function mapDispatchToProps(dispatch) {
  return {
    chat_actions: bindActionCreators(chatActions, dispatch)
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatBar);