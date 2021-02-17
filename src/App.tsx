import React, { useState } from 'react';
import styled from "styled-components";
import { MessageView } from "./MessageView";
import { UserList } from "./UserList";
import { UserInput } from "./UserInput";
import { UserCommand } from "./utils";
import messages from "./mock/messages.json";
import users from "./mock/users.json";
import { Tokens } from "./api";
import { register } from "./server";


export const App = () => {
	const [ tokens, setTokens ] = useState<Tokens | null>(null);

	const handleSubmit = async ( { command, args }:UserCommand) => {
		switch (command ) {
			case "register":

				const response = await register({ username: args[0], password: args[1] });
				return;
			default: // Not a command

		}
	}
	return (
		<OuterWrap>
			<Wrap>
				<MessageView messages={messages} users={users} />
				<UserList users={users} />
				<UserInput onSubmit={handleSubmit} />
			</Wrap>
		</OuterWrap>
	);
}
const OuterWrap = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100vh;
	width: 100vw;
	&, * {
		box-sizing: border-box;
	}
	* {
		font-family: "Courier New", monospace;
		font-size: 18px;
	}
`;

const Wrap = styled.div`
	border: 1px solid black;
	width: 100%;
	max-width: 800px;
	height: 100%;
	max-height: 600px;
	display: grid;
	grid-template-columns: auto 10em;
	grid-template-rows: 1fr auto;
	grid-template-areas: "messages users" "input input";
	> :first-child { grid-area: messages; }
	> :nth-child(2) { grid-area: users; }
	> :last-child { grid-area: input; }
	> * {
		border: 1px solid black;
		margin: 0;
	}
`;
