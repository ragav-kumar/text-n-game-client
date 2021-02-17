import React from "react";
import { isCommand, UserCommand } from "./utils";
import styled from "styled-components";

interface UserInputProps {
	onSubmit: (command:UserCommand) => void;
}

/**
 * Dumb user input box. This is one of the only interaction points in the application. Critically, no actual
 * processing happens here!
 */
export const UserInput = ( { onSubmit }: UserInputProps ) =>
	(
		<form onSubmit={( e ) => {
			e.preventDefault();
			const { command: { value } } = e.target as typeof e.target & { command: { value: string } }
			if (!value) return;
			onSubmit(parseInput(value));
		}}>
			<Input name="command"/>
		</form>
	)

const parseInput = (input:string):UserCommand => {
	// Test first char
	if (input[0] !== "!") {
		return { command: null, args: [ input ]};
	}
	const split = input.substr(1).split(" ");
	const command = split[0];
	if (!isCommand(command)) {
		return { command: null, args: [ input ]};
	}
	return {
		command: command,
		args: split.slice(1),
	};
}

const Input = styled.input`
	width: 100%;
	padding: .2em .5em;
	&, :focus {
		border: none;
		outline: none;
	}
`;