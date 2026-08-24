import {
    pgTable,
    uuid,
    text,
    integer,
    timestamp,
    pgEnum,
    uniqueIndex,
    index,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),

    discordId: text("discord_id").notNull().unique(),
    slackId: text("slack_id").unique(),

    linkedAt: timestamp("linked_at"),
    bannedAt: timestamp("banned_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
});
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export const finishReasonEnum = pgEnum("finish_reason_enum", [
    "cancelled",
    "failed",
    "finished",
]);
export const activeWeeks = pgTable(
    "active_weeks",
    {
        id: uuid("id").defaultRandom().primaryKey(),
        userId: uuid("user_id")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),

        startTime: timestamp("start_time").notNull(),
        endTime: timestamp("end_time").notNull(),
        targetHours: integer("target_hours").notNull(),

        finishReason: finishReasonEnum("finish_reason"),

        finishedAt: timestamp("finished_at"),
        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at")
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
    },
    (table) => [
        index("active_weeks_cron_idx").on(
            table.finishedAt,
            table.startTime,
            table.endTime,
        ),
        index("active_weeks_user_finished_idx").on(table.userId, table.finishedAt),
    ],
);
export type ActiveWeek = typeof activeWeeks.$inferSelect;
export type NewActiveWeek = typeof activeWeeks.$inferInsert;

export const trackedProgress = pgTable(
    "tracked_progress",
    {
        id: uuid("id").defaultRandom().primaryKey(),
        activeWeekId: uuid("active_week_id")
            .notNull()
            .references(() => activeWeeks.id, { onDelete: "cascade" }),

        weekNum: integer("week_num").notNull(),
        totalSeconds: integer("total_seconds").notNull(),

        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at")
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
    },
    (table) => [
        uniqueIndex("tracked_progress_active_week_num_unique").on(
            table.activeWeekId,
            table.weekNum,
        ),
    ],
);
export type TrackedProgress = typeof trackedProgress.$inferSelect;
export type NewTrackedProgress = typeof trackedProgress.$inferInsert;

export const trackedReminders = pgTable(
    "tracked_reminders",
    {
        id: uuid("id").defaultRandom().primaryKey(),
        activeWeekId: uuid("active_week_id")
            .notNull()
            .references(() => activeWeeks.id, { onDelete: "cascade" }),

        weekNum: integer("week_num").notNull(),
        dayNum: integer("day_num").notNull(),
        reminderType: text("reminder_type").notNull(),
        progressSeconds: integer("progress_seconds").notNull(),

        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at")
            .defaultNow()
            .$onUpdate(() => new Date())
            .notNull(),
    },
    (table) => [
        uniqueIndex("tracked_reminders_dedupe_unique").on(
            table.activeWeekId,
            table.weekNum,
            table.dayNum,
            table.reminderType,
        ),
        index("tracked_reminders_active_week_num_idx").on(
            table.activeWeekId,
            table.weekNum,
        ),
    ],
);
export type TrackedReminder = typeof trackedReminders.$inferSelect;
export type NewTrackedReminder = typeof trackedReminders.$inferInsert;

export const hackatimeAuths = pgTable("hackatime_auths", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),

    verifier: text("verifier"),
    expiresAt: timestamp("expires_at"),

    createdAt: timestamp("created_at").defaultNow().notNull(),
});
export type HackatimeAuth = typeof hackatimeAuths.$inferSelect;
export type NewHackatimeAuth = typeof hackatimeAuths.$inferInsert;