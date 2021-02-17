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
/**
 * Message as displayed onscreen
 */
export type DisplayMessage = {
	user: string;
	time: number;
	text: string;
}
