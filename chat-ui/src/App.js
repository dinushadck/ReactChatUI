import React, { useState } from 'react';
import { connect } from "react-redux";
import ChatBar from './components/chatbar';
import { bindActionCreators } from "redux";
import * as chatActions from "./redux/actions/chatActions";
import PropTypes from "prop-types";
import { register } from "./socket";
import { createChannel } from "./socket/channelConnection";

function App(props) {

  const [chatInfo, setChatInfo] = useState({
    myId: "",
    remoteId: "",
    token: "",
    messages: []
  });



  function handleChange(event) {
    const _chatInfo = { ...chatInfo, [event.target.name]: event.target.value };
    setChatInfo(_chatInfo);
  };

  function addChatBoxHandler(event) {

    props.chat_actions.addNewChat(chatInfo);

  }

  return (
    <div className="container-fluid">
      <div className="jumbotron">
        <h1 className="display-4">Simple Chat UI</h1>
        <p className="lead">This is a simple chat ui that supports multiple chats via socket.io</p>
        <hr className="my-4"></hr>
        <p>Press start to initiate chat mode</p>
        <p>
          My Alias &nbsp;&nbsp;&nbsp;: {}
          <input name="myId" type="text" onChange={handleChange}></input>
        </p>
        <p>
          Chat With : {}
          <input name="remoteId" type="text" onChange={handleChange}></input>
        </p>
        <p>
          Token &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : {}
          <input name="token" type="text" size="100" onChange={handleChange}></input>
        </p>
        <button className="btn btn-success btn-lg" onClick={() => register(chatInfo.myId)}>Register</button> &nbsp;
        <button className="btn btn-danger btn-lg" onClick={() => createChannel(chatInfo.token, {})}>Register With TCM</button> &nbsp;
        <button className="btn btn-info btn-lg" onClick={addChatBoxHandler}>Start</button>
      </div>
      <ChatBar />
    </div>
  );
}

App.propTypes = {
  chats: PropTypes.array.isRequired,
  chat_actions: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    chat_actions: bindActionCreators(chatActions, dispatch)
  };
}

export default connect(
  null,
  mapDispatchToProps
)(App);
