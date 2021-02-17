import { Endpoint, endpoints, Tokens } from "./api";

const clientId = "380c55361b0052fa3c78dc3d04521b89" as const;
const baseUrl = "http://localhost:3000/" as const;

interface FetchResponseSuccess<T extends unknown> {
	success: true;
	data: T;
	error: undefined;
}

interface FetchResponseFailure {
	success: false;
	data: undefined;
	error: string;
}

/**
 * Function for all API requests. Specifying the token will result in an authenticated request, skipping will make this
 * request unauthenticated (for example, register and login)
 */
export const apiFetch = async <RequestType extends unknown, ResponseType extends unknown> (
	endpoint: Endpoint, data: RequestType, token?:string
) => {
	try {
		const params:{[key:string]: string} = {
			client_id: clientId,
			data: JSON.stringify(data),
		}
		if (token) {
			params.access_token = token;
		}
		const body = new URLSearchParams(params).toString();
		const response = await fetch(baseUrl + endpoints[endpoint], {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: body,
		});
		const json = (await response.json()) as FetchResponseSuccess<ResponseType>|FetchResponseFailure;
		if (json.success) {
			return Promise.resolve(json.data);
		} else {
			return Promise.reject(json.error);
		}
	} catch ( e ) {
		console.log(e);
		return Promise.reject("Connection Error");
	}
}


interface RegisterLoginRequest {
	username: string;
	password: string;
}
/**
 * Register user account. Returns success (but not tokens!)
 */
export const register = async (request:RegisterLoginRequest) => await apiFetch<RegisterLoginRequest, boolean>("register", request);
/**
 * Login. Returns tokens
 */
export const login = async (request:RegisterLoginRequest) => await apiFetch<RegisterLoginRequest, Tokens>("login", request);
