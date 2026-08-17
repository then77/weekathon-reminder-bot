import type { TrackedUsers } from '@/types';

export const users = [
	{
		hackatimeUser: '...',
		discordId: '0123',
	},
	{
		hackatimeUser: '....',
		discordId: '1234',
	},
] as const satisfies TrackedUsers;

export class HackatimeUserNotFound extends Error {
	username: string;
	constructor(username: string) {
		super(`Hackatime user not found: ${username}`);
		this.username = username;
	}
}
