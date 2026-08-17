import ky, { HTTPError } from 'ky';
import { hackatimeConfigs } from '@/config';
import { HackatimeUserNotFound } from '@/shared';
import type { HackatimeStats, HackatimeUser } from '@/types';

const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const ONE_WEEK_MS = 7 * ONE_DAY_MS;

const hackatimeApi = ky.create({
	baseUrl: 'https://hackatime.hackclub.com/api/v1/',
	headers: {
		'X-App-ID': 'weekathon-reminder-bot',
		'X-Title': 'Weekathon Reminder Bot for YSWS with weekly challenge',
		'X-Contact': "If there's any question, contact Realzzy",
	},
});

function getDateInEt(date: Date) {
	const parts = new Intl.DateTimeFormat('en-CA', {
		timeZone: hackatimeConfigs.timeZone,
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	}).formatToParts(date);
	const year = parts.find((part) => part.type === 'year')?.value;
	const month = parts.find((part) => part.type === 'month')?.value;
	const day = parts.find((part) => part.type === 'day')?.value;

	return `${year}-${month}-${day}`;
}

function dateStringToTime(date: string) {
	return new Date(`${date}T00:00:00.000Z`).getTime();
}

function addDaysToDateString(date: string, days: number) {
	return new Date(dateStringToTime(date) + days * ONE_DAY_MS).toISOString().slice(0, 10);
}

function getTimeZoneOffsetMinutes(date: Date, timeZone: string) {
	const parts = new Intl.DateTimeFormat('en-US', {
		timeZone,
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hour12: false,
	}).formatToParts(date);
	const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
	const time = Date.UTC(
		Number(values.year),
		Number(values.month) - 1,
		Number(values.day),
		Number(values.hour),
		Number(values.minute),
		Number(values.second),
	);

	return (time - date.getTime()) / 60_000;
}

function formatOffset(offsetMinutes: number) {
	const sign = offsetMinutes >= 0 ? '+' : '-';
	const absoluteOffset = Math.abs(offsetMinutes);
	const hours = Math.floor(absoluteOffset / 60)
		.toString()
		.padStart(2, '0');
	const minutes = (absoluteOffset % 60).toString().padStart(2, '0');

	return `${sign}${hours}:${minutes}`;
}

function formatEtBoundary(date: string) {
	const midnightUtc = dateStringToTime(date);
	const offsetMinutes = getTimeZoneOffsetMinutes(new Date(midnightUtc), hackatimeConfigs.timeZone);

	return `${date}T00:00:00${formatOffset(offsetMinutes)}`;
}

export function isWeeklyStarted() {
	const today = getDateInEt(new Date());

	return dateStringToTime(today) >= dateStringToTime(hackatimeConfigs.startWeeklyDate);
}

function getCurrentWeeklyDateRange(currentDate: string) {
	const startWeeklyTime = dateStringToTime(hackatimeConfigs.startWeeklyDate);
	const currentTime = dateStringToTime(currentDate);
	const weekOffset = Math.max(0, Math.floor((currentTime - startWeeklyTime) / ONE_WEEK_MS));
	const dayOffset = Math.max(0, Math.floor((currentTime - startWeeklyTime) / ONE_DAY_MS));
	const startDate = new Date(startWeeklyTime + weekOffset * ONE_WEEK_MS).toISOString().slice(0, 10);
	const endDate = new Date(startWeeklyTime + (weekOffset + 1) * ONE_WEEK_MS).toISOString().slice(0, 10);

	return {
		currentDayNum: dayOffset + 1,
		currentWeekNum: weekOffset + 1,
		startWeekDate: startDate,
		endWeekDate: endDate,
		startDate: formatEtBoundary(startDate),
		endDate: formatEtBoundary(endDate),
	};
}

function getSecondsUntil(boundary: string, now: Date) {
	return Math.max(0, Math.ceil((new Date(boundary).getTime() - now.getTime()) / 1000));
}

async function getCodingSeconds(user: HackatimeUser, startDate: string, endDate: string) {
	try {
		const resp = await hackatimeApi.get(`users/${user}/stats`, {
			searchParams: {
				total_seconds: true,
				start_date: startDate,
				end_date: endDate,
			},
		});

		const json = await resp.json<{ total_seconds: number }>();
		return json.total_seconds;
	} catch (error) {
		if (error instanceof HTTPError && error.response.status === 404) {
			throw new HackatimeUserNotFound(user);
		}

		throw error;
	}
}

export async function getStats(user: HackatimeUser, recap?: boolean): Promise<HackatimeStats> {
	const now = new Date();
	const currentDate = getDateInEt(now);
	const statsDate = recap ? addDaysToDateString(currentDate, -1) : currentDate;
	const nextStatsDate = addDaysToDateString(statsDate, 1);
	const todayStartDate = formatEtBoundary(statsDate);
	const todayEndDate = formatEtBoundary(nextStatsDate);
	const weeklyDateRange = getCurrentWeeklyDateRange(statsDate);
	const [todayCodingSeconds, weeklyCodingSeconds] = await Promise.all([
		getCodingSeconds(user, todayStartDate, todayEndDate),
		getCodingSeconds(user, weeklyDateRange.startDate, weeklyDateRange.endDate),
	]);

	return {
		current_date: statsDate,
		current_day_num: weeklyDateRange.currentDayNum,
		current_week_num: weeklyDateRange.currentWeekNum,
		start_week_date: weeklyDateRange.startWeekDate,
		end_week_date: weeklyDateRange.endWeekDate,
		seconds_until_daily_reset: getSecondsUntil(todayEndDate, now),
		seconds_until_weekly_reset: getSecondsUntil(weeklyDateRange.endDate, now),
		today_coding_seconds: todayCodingSeconds,
		weekly_coding_seconds: weeklyCodingSeconds,
	};
}
