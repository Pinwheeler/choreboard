import { DateTime } from "luxon"
import { GuildEntity, GuildModel } from "../Guild.model"
import { QuestModel } from "../Quest.model"

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
}

describe("GuildModel", () => {
  describe("initializing with recurring quests", () => {
    const ON_WEEKDAY = {
      ...TEST_QUEST,
      id: "ON_WEEKDAY",
      name: "ON_WEEKDAY_NAME",
      recurring: "onWeekday",
      repeatOnWeekday: [1],
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
  })
})
