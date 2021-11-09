import {
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import { useField } from "formik"
import React from "react"
import { Weekday } from "../../core/forms/Project.form"

export const OnWeekdayRecurrence: React.FC = () => {
  const [field, meta, helper] = useField<Weekday[]>("repeatOnWeekday")

  const theme = useTheme()
  const isSmall = !useMediaQuery(theme.breakpoints.up("sm"))

  const onChange = (_event: any, value: Weekday[]) => {
    helper.setValue(value)
  }

  const sizedText = (weekday: Weekday) => {
    switch (weekday) {
      case "monday":
        return isSmall ? "Mon" : "Monday"
      case "tuesday":
        return isSmall ? "Tue" : "Tuesday"
      case "wednesday":
        return isSmall ? "Wed" : "Wednesday"
      case "thursday":
        return isSmall ? "Thu" : "Thursday"
      case "friday":
        return isSmall ? "Fri" : "Friday"
      case "saturday":
        return isSmall ? "Sat" : "Saturday"
      case "sunday":
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
          {sizedText("monday")}
        </ToggleButton>
        <ToggleButton style={{ width: "100%" }} value={"tuesday"}>
          {sizedText("tuesday")}
        </ToggleButton>
        <ToggleButton style={{ width: "100%" }} value={"wednesday"}>
          {sizedText("wednesday")}
        </ToggleButton>
        <ToggleButton style={{ width: "100%" }} value={"thursday"}>
          {sizedText("thursday")}
        </ToggleButton>
        <ToggleButton style={{ width: "100%" }} value={"friday"}>
          {sizedText("friday")}
        </ToggleButton>
        <ToggleButton style={{ width: "100%" }} value={"saturday"}>
          {sizedText("saturday")}
        </ToggleButton>
        <ToggleButton style={{ width: "100%" }} value={"sunday"}>
          {sizedText("sunday")}
        </ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  )
}
