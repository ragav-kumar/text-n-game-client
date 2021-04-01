import React from "react";
import styled from "styled-components";
import { DisplayMessage, userType } from "./utils";
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
				return <MessageItem {...message} user={username} type={userType(message.user)}/>
			})}
		</Wrap>
	)

const Wrap = styled.ul`
	padding: .2em;
	margin: 0;
	list-style-type: none;
	overflow-y: scroll;
`;

const MessageItem = ( { time, text, user, type }: DisplayMessage ) => {
	const date = new Date(time * 1000);
	const displayTime = ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2) + ":" + ("0" + date.getSeconds()).slice(-2);
	return (
		<ItemWrap isSystem={type === 'system'}>
			<TimeText>{displayTime}</TimeText>
			|
			<UserText>{user + "> "}</UserText>
			<span>{text}</span>
		</ItemWrap>
	);
};
const UserText = styled.span`
	font-weight: bold;
`;
const TimeText = styled.span`
	font-style: italic;
`;
interface ItemWrapProps {
	isSystem: boolean;
}
const ItemWrap = styled.li<ItemWrapProps>`
	color: ${p => p.isSystem ? "gray" : "black"};
`;