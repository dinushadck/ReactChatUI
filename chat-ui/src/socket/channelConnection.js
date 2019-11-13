import { ChannelFactory } from "../tcm_signaling_sdk";

let channel = null;
let eventHandlers = null;

export function createChannel(token, chatEventHandlers) {
    channel = new ChannelFactory(token, "192.168.1.9:3000", {}, chatEventHandlers, {});

    if (eventHandlers) {
        updateEventListners(eventHandlers);
    }
}

export function updateEventListners(evtHandlers) {
    eventHandlers = evtHandlers;
    if (channel) {
        channel.chat.setEventHandlers(evtHandlers);
    }

}

export function sendChatMessage(type, data, content) {
    if (channel) {
        channel.chat.sendMessage(type, data, content);
    }

}
