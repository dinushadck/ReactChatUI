import React, {useState} from 'react';
import PropTypes from "prop-types";

function ChatBox(props) {

    const [myMessage, setMyMessage] = useState("");

    function handleChange(event) {
        setMyMessage(event.target.value);
      };

    return (
        
    <div key={props.chat.remoteId} className="container">
    <div>
        <div>
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <span className="glyphicon glyphicon-comment"></span> {props.chat.remoteId}
                    <div className="btn-group pull-right">
                        <button type="button" className="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown">
                            <span className="glyphicon glyphicon-chevron-down"></span>
                        </button>
                        <ul className="dropdown-menu slidedown">
                            <li><a href="http://www.jquery2dotnet.com"><span className="glyphicon glyphicon-refresh">
                            </span>Refresh</a></li>
                            <li><a href="http://www.jquery2dotnet.com"><span className="glyphicon glyphicon-ok-sign">
                            </span>Available</a></li>
                            <li><a href="http://www.jquery2dotnet.com"><span className="glyphicon glyphicon-remove">
                            </span>Busy</a></li>
                            <li><a href="http://www.jquery2dotnet.com"><span className="glyphicon glyphicon-time"></span>
                                Away</a></li>
                            <li className="divider"></li>
                            <li><a href="http://www.jquery2dotnet.com"><span className="glyphicon glyphicon-off"></span>
                                Sign Out</a></li>
                        </ul>
                    </div>
                </div>
                <div className="panel-body">
                    <ul className="chat">
                        {props.chat.messages.map(message => (
                            <li key={message.content} className="left clearfix"><span className="chat-img pull-left">
                                <img src="http://placehold.it/50/55C1E7/fff&text=U" alt="User Avatar" className="img-circle" />
                                </span>
                                <div className="chat-body clearfix">
                                    <div className="header">
                                        <strong className="primary-font">{message.from}</strong> <small className="pull-right text-muted">
                                        <span className="glyphicon glyphicon-time"></span>12 mins ago</small>
                                    </div>
                                    <p>
                                        {message.content}
                                    </p>
                                </div>
                            </li>)

                        )}                        
                        
                    </ul>
                </div>
                <div className="panel-footer">
                    <div className="input-group">
                        <input id="btn-input" type="text" className="form-control input-sm" placeholder="Type your message here..." onChange={handleChange} />
                        <span className="input-group-btn">
                            <button className="btn btn-warning btn-sm" id="btn-chat" onClick={()=>props.onsend(props.chat.myId, props.chat.remoteId, myMessage)}>
                                Send</button>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
);
}

ChatBox.propTypes = {
    onsend: PropTypes.func.isRequired
  };



export default ChatBox;