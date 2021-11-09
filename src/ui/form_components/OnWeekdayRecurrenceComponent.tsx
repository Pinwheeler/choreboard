import { Stack, ToggleButton, ToggleButtonGroup } from "@mui/material"
import { useField } from "formik"
import React from "react"
import { Weekday } from "../../core/forms/Project.form"

export const OnWeekdayRecurrence: React.FC = () => {
  const [field, meta, helper] = useField<Weekday[]>("repeatOnWeekday")

  console.log("field.value", field.value)

  const onChange = (_event: any, value: Weekday[]) => {
    helper.setValue(value)
  }

  return (
    <Stack direction="row">
      <ToggleButtonGroup
        color="primary"
        onChange={onChange}
        value={field.value}
      >
        <ToggleButton value={"monday"}>Monday</ToggleButton>
        <ToggleButton value={"tuesday"}>Tuesday</ToggleButton>
        <ToggleButton value={"wednesday"}>Wednesday</ToggleButton>
        <ToggleButton value={"thursday"}>Thursday</ToggleButton>
        <ToggleButton value={"friday"}>Friday</ToggleButton>
        <ToggleButton value={"saturday"}>Saturday</ToggleButton>
        <ToggleButton value={"sunday"}>Sunday</ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  )
}
