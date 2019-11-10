import React, {useState} from 'react';
import { connect } from "react-redux";
import ChatBar from './components/chatbar';
import { bindActionCreators } from "redux";
import * as chatActions from "./redux/actions/chatActions";
import PropTypes from "prop-types";
import {register} from "./socket";

function App(props) {

  const [chatInfo, setChatInfo] = useState({
    myId: "",
    remoteId: "",
    messages: []
  });

  function handleChange(event) {
    const _chatInfo = { ...chatInfo, [event.target.name]: event.target.value };
    setChatInfo(_chatInfo);
  };
  
  function addChatBoxHandler(event){
  
    props.actions.addNewChat(chatInfo);
    
  }

  return (
    <div className="container-fluid">
      <div className="jumbotron">
        <h1 className="display-4">Simple Chat UI</h1>
        <p className="lead">This is a simple chat ui that supports multiple chats via socket.io</p>
        <hr className="my-4"></hr>
        <p>Press start to initiate chat mode</p>
        <p>
          My Alias &nbsp;&nbsp;: { }
          <input name="myId" type="text" onChange={handleChange}></input>
        </p>
        <p>
          Chat With : { }
          <input name="remoteId" type="text" onChange={handleChange}></input>
        </p>
        <button className="btn btn-primary btn-lg" onClick={()=>register(chatInfo.myId)}>Register</button>
        <button className="btn btn-primary btn-lg" onClick={addChatBoxHandler}>Start</button>
      </div>
      <ChatBar/>
    </div>
  );  
}

ChatBar.propTypes = {
  chats: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(chatActions, dispatch)
  };
}

export default connect(
  null,
  mapDispatchToProps
)(App);
