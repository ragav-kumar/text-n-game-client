import { Message } from "./api";

const commands = [
	"register",
	"login",
	"logout",
	"forgot-password",
	"change-password",
] as const;
/**
 * Every user input begins with a Command (or null, if no command) which determines how input is processed
 */
export type Command = (typeof commands)[number];

export const isCommand = (com:string): com is Command => commands.includes(com as Command)
/**
 * The full input from a user
 */
export type UserCommand = {
	command: Command|null;
	// If command is null, then args will be have a length of 1
	args: string[];
}
export type UserType = "user"|"system";
/**
 * Message as displayed onscreen
 */
export type DisplayMessage = {
	type: UserType;
	user: string;
	time: number;
	text: string;
}

export const currentTimestamp = () => Date.now() / 1000;

export const userType = (userId:number):UserType => !!userId ? "user" : "system";

export const systemMessage = (text: string):Message => ({
	user: 0,
	text: text,
	time: currentTimestamp(),
});