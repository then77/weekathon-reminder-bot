export const notificationMessages = {
	// Normal finish daily
	contrags_daily: [
		"Yo {user}, clean work today. Daily code hours cleared. Take the W and run it back tomorrow.",
		"Nice one {user}, today's target got packed up nicely. Keep those code hours cooking after this.",
		"Well played {user}, daily mission complete. The streak requirement has been defeated for today."
	],
	// Normal finish weekly
	contrags_weekly: [
		"Big W {user}, weekly code target reached. You survived the grind, now get ready to bully another week tomorrow.",
		"Great work {user}, this week's hours are in the bag. The weekathon gods accept your offering.",
		"Nice job {user}, weekly goal completed. Rest easy for a bit, then we go again like nothing happened."
	],
	// Finished weekly before day 6
	contrags_weekly_early: [
		"DAMN {user}, weekly target finished early. Absolute menace behavior. Please rest now, see ya next week.",
		"Yo {user}, you cooked the weekly goal before the week even ended. The keyboard needs a break too, go chill.",
		"Insane pace {user}, weekly hours already done early. Mission cleared, please touch some grass until next week."
	],
	// Reminder before sleep
	special_reminder: [
		"Hey {user}, tiny night reminder: do your code before sleep, would you? Future you will be less cooked tomorrow.",
		"Psst {user}, tomorrow energy is coming. Sneak in your code hours tonight before the bed claims you.",
		"Yo {user}, before you disappear into sleep mode, please get some code in. Just enough to keep the weekly target from hunting you."
	],
	// Coded today, but still under target. for day (1-3)
	under_daily: [
		"Good progress {user}, but today's code hours are still below the pace you need. Tomorrow has to hit harder, bro.",
		"Not bad {user}, but the daily target is still standing there like a final boss. Come back stronger tomorrow.",
		"You moved the needle {user}, but not enough for today's expected pace. Lock in a bit more tomorrow so the week doesn't bite back."
	],
	// Coded today, still under target. for day (4-6)
	very_under_daily: [
		"Nice try {user}, but today's code hours are still way too low. This is not enough damage. Go harder next round.",
		"Yo {user}, that was below half of today's needed pace. Respect the attempt, but the weekly target is still laughing.",
		"Careful {user}, today's progress barely scratched the target. Tomorrow needs main-character grind, not background NPC energy."
	],
	// No code today
	no_daily: [
		"Damn {user}, yesterday had zero code hours. The keyboard filed a missing person report. Go code today before the target runs away.",
		"Bro {user}, no code yesterday? That's a dangerous side quest. Get back in today so the weekly goal doesn't become a horror movie.",
		"Hey {user}, yesterday was a ghost town for code. Wake the repo up today and save the weekly target."
	],
	// Not coded for 3 day streak
	no_daily_streak: [
		"{user}, did you forget coding exists?? Three days no code is crazy. Open the editor now before this week turns into a crime scene.",
		"BRO {user}, three-day no-code streak detected. That is not a streak we celebrate. Get those hours in today.",
		"Emergency ping {user}: code has been missing for three days. Bring it back immediately before the weekly target buries you."
	],
	// Day 6 and weekly target progress <= 70%, or day 7 and progress <= 80%
	light_urgent: [
		"Heads up {user}, the weekly target is behind pace. Not doomed, but this is the part where you stop playing and start stacking hours.",
		"Yo {user}, you're close enough to save this, but far enough that chilling is dangerous. Get some code in before the week starts pressing charges.",
		"{user}, warning lights are on. Weekly progress needs a push today, but the comeback is still very much alive."
	],
	// Day 7 and weekly target progress <= 70%
	light_very_urgent: [
		"Bro {user}, day 7 is here and the target still needs serious work. You can still save it, but only if you lock in now.",
		"{user}, this is danger zone but not a funeral yet. Weekly target is reachable, just don't waste the comeback window.",
		"Yo {user}, the week is almost done and you're still behind. Time to enter focused grind mode before this becomes cooked."
	],
	// Day 7, less than 3 hours before week reset, but weekly target is still reachable
	light_alert: [
		"Final sprint {user}! Less than 3 hours before reset, but the weekly target is still reachable. Lock in and clutch this.",
		"{user}, this is the last window. The target can still be cleared before reset, but only if the editor opens now.",
		"Yo {user}, you are one clean push away from surviving the weekathon. Less than 3 hours left, go finish the job."
	],
	// Day 5 and weekly target progress <= 50%
	urgent: [
		"Hey {user}, LOCK IN RIGHT NOW. It's already late in the week and you're still way behind the weekly target.",
		"Yo {user}, this is not a drill. Weekly progress is under half and the calendar is closing in. Code now, panic later.",
		"{user}, the week is almost over and the target is still miles away. Enter grind mode immediately."
	],
	// Day 6 and weekly target progress <= 50%
	very_urgent: [
		"Bro {user}, you need to start cooking RIGHT NOW. Day is late, target is far, and the comeback window is tiny.",
		"{user}, this is maximum danger territory. Weekly hours are still under half with barely any week left. No more chilling, code now.",
		"Yo {user}, the target is not close, the clock is not kind, and excuses are unemployed. Get locked in immediately."
	],
	// Day 7 and weekly target progress <= 50%
	alert: [
		"**LAST REMINDER {user}! CODE LIKE FCKING RIGHT NOW!** Weekly target is still under half and this is basically your final chance to survive the weekathon.",
		"**FINAL WARNING {user}:** the weekly target is still far away. Open the editor **NOW** or you're walking straight into the kicked-out ending.",
		"{user}, this is the **last call** before the week closes. No soft words left. **CODE NOW**, or the weekathon run is cooked."
	],
	// Finished weekly speedrun on day 7
	dodged_alert: [
		"Nice comeback {user}! Weekly target cleared on single day. Literal last-minute speedrun, you dodged elimination by a pixel.",
		"DAMN {user} 💀, cant believe you actually survived. Weekly cleared in single day is insane final-boss behavior. Never do that to your heart again.",
		"{user}, did you just dodged elimination in last minute? Weekly target completed at the absolute edge of disaster. Absolute heist."
	],
	// Missed weekly target
	cooked: [
		"Bro {user} is cooked 💀💀 There is no way you can reach the weekly target before reset now. Pack it up, this weekathon run is dead.",
		"GG {user}, but the math is impossible now. Too many code hours left, not enough time before reset. That's a weekathon elimination right there.",
		"{user}, cooked status confirmed 💀 Weekly target is still too far and the clock is basically gone. Better luck next time."
	],
	// Special error message: not found
	user_not_found: [
		"Hey, i cant find your hackatime data for {slack}. What did you do? My reminder cant work properly without it."
	],
} as const;