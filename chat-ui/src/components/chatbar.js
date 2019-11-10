import React from 'react';
import { connect } from "react-redux";
import * as chatActions from "../redux/actions/chatActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import ChatBox from './chatbox';
import {sendMessage, registerCallBack} from "../socket";

function ChatBar(props) {

  let onChat = function onChatReceived(message){
    //notify action creator
    props.actions.receiveNewMessage({from:message.from, to:message.to, content:message.content})
  
  }

  let sendMessageViaSocket = function(from, to, content){
    props.actions.sendNewMessage({from:from, to:to, content:content})
    sendMessage(from, to, content);
  }

  registerCallBack(onChat);

  return (
      <div className="container-fluid row">
        {props.chats.map(chat => (
          <div key={chat.remoteId} className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
          <ChatBox chat={chat} onsend = {sendMessageViaSocket}/>
          </div>
        ))}
        
      </div>
    );
}

ChatBar.propTypes = {
  chats: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    chats: state.chats
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(chatActions, dispatch)
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatBar);