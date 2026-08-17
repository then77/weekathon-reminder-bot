import type { users } from '@/shared';

export type TrackedUsers = {
	hackatimeUser: string;
	discordId: `${number}`;
}[];

export type HackatimeUser = (typeof users)[number]['hackatimeUser'];

export type HackatimeStats = {
	current_date: string;
	current_day_num: number;
	current_week_num: number;
	start_week_date: string;
	end_week_date: string;
	seconds_until_daily_reset: number;
	seconds_until_weekly_reset: number;
	today_coding_seconds: number;
	weekly_coding_seconds: number;
};
