import React from "react";
import styled from "styled-components";
import { DisplayMessage } from "./utils";
import { Message, User } from "./api";

interface MessageViewProps {
	messages: Message[];
	users: User[];
}

export const MessageView = ( { messages, users }: MessageViewProps ) =>
	(
		<Wrap>
			{messages.map(message => {
				const username = users.find(u => u.id === message.user)?.username || `${message.user}`;
				return <MessageItem {...message} user={username}/>
			})}
		</Wrap>
	)

const Wrap = styled.ul`
	padding: .2em;
	margin: 0;
	list-style-type: none;
	overflow-y: scroll;
`;

const MessageItem = ( { user, time, text }: DisplayMessage ) => {
	const date = new Date(time * 1000);
	const displayTime = ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2) + ":" + ("0" + date.getSeconds()).slice(-2);
	return (
		<li>
			<TimeText>{displayTime}</TimeText>
			|
			<UserText>{user + "> "}</UserText>
			<span>{text}</span>
		</li>
	);
};
const UserText = styled.span`
	font-weight: bold;
`;
const TimeText = styled.span`
	font-style: italic;
`;