import {
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import { useField } from "formik"
import React from "react"
import { Weekday } from "../../core/forms/Quest.form"

export const OnWeekdayRecurrence: React.FC = () => {
  const [field, meta, helper] = useField<Weekday[]>("repeatOnWeekday")

  const theme = useTheme()
  const isSmall = !useMediaQuery(theme.breakpoints.up("lg"))

  const onChange = (_event: any, value: Weekday[]) => {
    helper.setValue(value)
  }

  const sizedText = (weekday: Weekday) => {
    switch (weekday) {
      case Weekday.Monday:
        return isSmall ? "Mon" : "Monday"
      case Weekday.Tuesday:
        return isSmall ? "Tue" : "Tuesday"
      case Weekday.Wednesday:
        return isSmall ? "Wed" : "Wednesday"
      case Weekday.Thursday:
        return isSmall ? "Thu" : "Thursday"
      case Weekday.Friday:
        return isSmall ? "Fri" : "Friday"
      case Weekday.Saturday:
        return isSmall ? "Sat" : "Saturday"
      case Weekday.Sunday:
        return isSmall ? "Sun" : "Sunday"
    }
  }

  return (
    <Stack direction="row" style={{ marginTop: 15, width: "100%" }}>
      <ToggleButtonGroup
        color="primary"
        onChange={onChange}
        value={field.value}
        style={{ width: "100%" }}
      >
        <ToggleButton style={{ width: "100%" }} value={"monday"}>
          {sizedText(Weekday.Monday)}
        </ToggleButton>
        <ToggleButton style={{ width: "100%" }} value={"tuesday"}>
          {sizedText(Weekday.Tuesday)}
        </ToggleButton>
        <ToggleButton style={{ width: "100%" }} value={"wednesday"}>
          {sizedText(Weekday.Wednesday)}
        </ToggleButton>
        <ToggleButton style={{ width: "100%" }} value={"thursday"}>
          {sizedText(Weekday.Thursday)}
        </ToggleButton>
        <ToggleButton style={{ width: "100%" }} value={"friday"}>
          {sizedText(Weekday.Friday)}
        </ToggleButton>
        <ToggleButton style={{ width: "100%" }} value={"saturday"}>
          {sizedText(Weekday.Saturday)}
        </ToggleButton>
        <ToggleButton style={{ width: "100%" }} value={"sunday"}>
          {sizedText(Weekday.Sunday)}
        </ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  )
}
