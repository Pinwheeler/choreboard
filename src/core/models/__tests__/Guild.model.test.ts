import { DateTime } from "luxon"
import { GuildEntity, GuildModel } from "../Guild.model"
import { Priority } from "../Priority.model"
import { QuestEntity, QuestModel } from "../Quest.model"
import { TaskModel } from "../Task.model"

const TEST_NAME = "TEST_NAME"
const TEST_GUILD = "TEST_GUILD"
const TEST_OWNER_ID = "TEST_OWNER_ID"

const TEST_QUEST: QuestModel = {
  id: "TEST_QUEST_ID",
  name: "TEST_QUEST_NAME",
  guild: TEST_GUILD,
  createdAt: 1636796756000, // Saturday Nov 20, 2021
  recurring: "none",
  repeatWeekly: 0,
  ownerId: TEST_OWNER_ID,
  tasks: [],
  synthetic: false,
}

describe("GuildModel", () => {
  describe("initializing with recurring quests", () => {
    const MONDAY_TASK_1: TaskModel = {
      name: "get money",
      priority: Priority.normal,
      complete: false,
    }

    const MONDAY_TASK_2: TaskModel = {
      name: "get paid",
      priority: Priority.high,
      complete: false,
    }

    const ON_WEEKDAY = {
      ...TEST_QUEST,
      id: "ON_WEEKDAY",
      name: "ON_WEEKDAY_NAME",
      recurring: "onWeekday",
      repeatOnWeekday: [1],
      tasks: [MONDAY_TASK_1, MONDAY_TASK_2],
    }

    const WEEKLY = {
      ...TEST_QUEST,
      id: "WEEKLY",
      name: "WEEKLY_NAME",
      recurring: "weekly",
      repeatWeekly: 2,
    }

    const model: GuildModel = {
      name: TEST_NAME,
      quests: { TEST_QUEST: TEST_QUEST },
      recurring_quests: {
        ON_WEEKDAY,
        WEEKLY,
      },
    }

    describe("when there are not yet any synthetics", () => {
      it("creates a synthetic instance for every recurring quest", () => {
        const guild = new GuildEntity(model)
        const onWeekdayEntity = guild.recurringQuests[ON_WEEKDAY.id]
        const weeklyEntity = guild.recurringQuests[WEEKLY.id]
        const onWeekdaySynthetic = guild.quests[ON_WEEKDAY.id]
        const weeklySynthetic = guild.quests[WEEKLY.id]

        expect(onWeekdaySynthetic.name).toEqual(ON_WEEKDAY.name)
        expect(onWeekdaySynthetic.dueDate).toEqual(
          onWeekdayEntity
            .dateOfFirstRecurrenceOnOrAfter(DateTime.now())
            .endOf("day")
        )
        expect(onWeekdaySynthetic.syntheticTo).toEqual(onWeekdayEntity)

        expect(weeklySynthetic.name).toEqual(WEEKLY.name)
        expect(weeklySynthetic.dueDate).toEqual(
          weeklyEntity
            .dateOfFirstRecurrenceOnOrAfter(DateTime.now())
            .endOf("day")
        )
        expect(weeklySynthetic.syntheticTo).toEqual(weeklyEntity)
      })
    })

    describe("when there is already a synthetic quest coming from the server", () => {
      describe("when the synthetic quest is the next recurrence", () => {
        beforeEach(() => {
          const onWeekdayEntity = new QuestEntity(ON_WEEKDAY)
          const weeklyEntity = new QuestEntity(WEEKLY)
          model.quests![ON_WEEKDAY.id] = {
            ...ON_WEEKDAY,
            dueDate: onWeekdayEntity
              .dateOfFirstRecurrenceOnOrAfter(DateTime.now())
              .toMillis(),
            tasks: [MONDAY_TASK_1, { ...MONDAY_TASK_2, complete: true }],
          }
          model.quests![WEEKLY.id] = {
            ...WEEKLY,
            dueDate: weeklyEntity
              .dateOfFirstRecurrenceOnOrAfter(DateTime.now())
              .toMillis(),
          }
        })

        it("does not create any synthetic events as they are already here", () => {
          const guild = new GuildEntity(model)

          // there should not have been any added to or removed from the collection
          expect(Object.entries(guild.quests).length).toBe(3)

          // the second monday task should still be completed
          const onWeekdayEntity = guild.quests[ON_WEEKDAY.id]
          expect(onWeekdayEntity.tasks[0].complete).toBe(false)
          expect(onWeekdayEntity.tasks[1].complete).toBe(true)
        })
      })

      describe("when the synthetic quest is NOT the next recurrence", () => {
        beforeEach(() => {
          model.quests![ON_WEEKDAY.id] = {
            ...ON_WEEKDAY,
            dueDate: 700,
            tasks: [MONDAY_TASK_1, { ...MONDAY_TASK_2, complete: true }],
          }
          model.quests![WEEKLY.id] = {
            ...WEEKLY,
            dueDate: 700,
          }
        })

        it("creates new synthetic events and replaces the old ones", () => {
          const guild = new GuildEntity(model)

          // there should not have been any added to or removed from the collection
          expect(Object.entries(guild.quests).length).toBe(3)

          const onWeekDayDueDate = guild.recurringQuests[
            ON_WEEKDAY.id
          ].firstRecurrenceOnOrAfter(DateTime.now()).dueDate
          const weeklyDueDate = guild.recurringQuests[
            WEEKLY.id
          ].firstRecurrenceOnOrAfter(DateTime.now()).dueDate
          expect(guild.quests[ON_WEEKDAY.id].dueDate).toEqual(onWeekDayDueDate)
          expect(guild.quests[WEEKLY.id].dueDate).toEqual(weeklyDueDate)

          // none of the monday tasks should be completed now
          const onWeekdayEntity = guild.quests[ON_WEEKDAY.id]
          expect(onWeekdayEntity.tasks[0].complete).toBe(false)
          expect(onWeekdayEntity.tasks[1].complete).toBe(false)
        })
      })
    })
  })
})
