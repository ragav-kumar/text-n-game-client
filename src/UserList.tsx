import React from "react";
import { User } from "./api";
import styled from "styled-components";

interface UserListProps {
	users: User[];
}

export const UserList = ( { users }: UserListProps ) =>
	(
		<Wrap>
			{users.map(user => <li>{user.username}</li>)}
		</Wrap>
	)
const Wrap = styled.ul`
	margin-left: 0;
	padding: .2em;
	list-style-type: none;
`;