import { DateTime } from "luxon"
import { Weekday } from "../../forms/Quest.form"
import { QuestEntity, QuestModel } from "../Quest.model"

const TEST_ID = "ABCDEFG123411234"
const TEST_NAME = "TEST_NAME"
const TEST_GUILD = "/guilds/test_guild"
const TEST_DATE_MILLIS = 1636796756000 // Saturday Nov 20, 2021
const TEST_OWNER_ID = "0wn3r"
const TEST_CREATE_DATE = DateTime.fromMillis(TEST_DATE_MILLIS)

describe("QuestEntity", () => {
  describe("with a weekly repeat cadence", () => {
    const model: QuestModel = {
      id: TEST_ID,
      name: TEST_NAME,
      guild: TEST_GUILD,
      createdAt: TEST_DATE_MILLIS,
      recurring: "weekly",
      repeatWeekly: 2,
      ownerId: TEST_OWNER_ID,
      tasks: [],
    }

    let entity: QuestEntity

    beforeEach(() => {
      entity = new QuestEntity(model)
    })

    describe("#recurringOnDate", () => {
      it("works when using the creation date", () => {
        expect(entity.recurringOnDate(TEST_CREATE_DATE)).toBe(true)
      })

      it("returns false exactly one week after creation date", () => {
        const targetDate = TEST_CREATE_DATE.plus({ weeks: 1 })
        expect(entity.recurringOnDate(targetDate)).toBe(false)
      })

      it("returns true exactly 2 weeks after creation date", () => {
        const targetDate = TEST_CREATE_DATE.plus({ weeks: 2 })
        expect(entity.recurringOnDate(targetDate)).toBe(true)
      })
    })

    describe("#firstRecurrenceOnOrAfter", () => {
      let expectedFirstRecurrenceDate: DateTime

      beforeEach(() => {
        expectedFirstRecurrenceDate = TEST_CREATE_DATE.plus({ weeks: 2 })
      })
      it("before first recurrence", () => {
        const targetDate = TEST_CREATE_DATE.plus({ days: 8 })
        const result = entity.firstRecurrenceOnOrAfter(targetDate)
        expect(result.dueDate).toEqual(expectedFirstRecurrenceDate)
      })

      it("on first recurrence", () => {
        const targetDate = expectedFirstRecurrenceDate
        const result = entity.firstRecurrenceOnOrAfter(targetDate)
        expect(result.dueDate).toEqual(expectedFirstRecurrenceDate)
      })

      it("after first recurrence", () => {
        const targetDate = expectedFirstRecurrenceDate.plus({ days: 1 })
        const result = entity.firstRecurrenceOnOrAfter(targetDate)
        expect(result.dueDate).toEqual(
          expectedFirstRecurrenceDate.plus({ weeks: 2 })
        )
      })
    })

    describe("with broken data", () => {
      const model: QuestModel = {
        id: TEST_ID,
        name: TEST_NAME,
        guild: TEST_GUILD,
        createdAt: TEST_DATE_MILLIS,
        recurring: "weekly",
        repeatWeekly: 999,
        ownerId: TEST_OWNER_ID,
        tasks: [],
      }

      beforeEach(() => {
        entity = new QuestEntity(model)
      })

      it("#firstRecurrenceOnOrAfter times out after 1 year of lookahead", () => {
        expect(
          entity.firstRecurrenceOnOrAfter(TEST_CREATE_DATE.plus({ weeks: 1 }))
        ).toThrow()
      })
    })
  })

  describe("with an 'onWeekday' repeat cadence", () => {
    const model: QuestModel = {
      id: TEST_ID,
      name: TEST_NAME,
      guild: TEST_GUILD,
      createdAt: TEST_DATE_MILLIS,
      recurring: "onWeekday",
      repeatWeekly: 0,
      repeatOnWeekday: [Weekday.Monday, Weekday.Thursday],
      ownerId: TEST_OWNER_ID,
      tasks: [],
    }

    let entity: QuestEntity

    beforeEach(() => {
      entity = new QuestEntity(model)
    })

    describe("#recurringOnDate", () => {
      it("does not work when using the creation date", () => {
        expect(entity.recurringOnDate(TEST_CREATE_DATE)).toBe(false)
      })

      it("does not work when using the day after creation day", () => {
        const targetDate = TEST_CREATE_DATE.plus({ days: 1 })
        expect(entity.recurringOnDate(targetDate)).toBe(false)
      })

      it("works when using a monday", () => {
        const targetDate = TEST_CREATE_DATE.plus({ days: 2 })
        expect(entity.recurringOnDate(targetDate)).toBe(true)
      })
    })
  })
})
