import { Rating, Stack, Typography } from "@mui/material"
import { useField } from "formik"
import React from "react"
import { Priority } from "../../core/models/Priority"

interface Props {
  index: number
}

export const PriorityComponent: React.FC<Props> = (props) => {
  const { index } = props
  const [field, _meta, helper] = useField<Priority>(`tasks[${index}].priority`)

  const onChange = (_event: any, value: number | null) => {
    if (value) {
      helper.setValue(value - 1)
    } else {
      helper.setValue(1)
    }
  }

  return (
    <Stack>
      <Rating onChange={onChange} value={field.value + 1} max={3} />
      <PriorityText priority={field.value} />
    </Stack>
  )
}

const PriorityText: React.FC<{ priority?: Priority }> = (props) => {
  const { priority } = props

  switch (priority) {
    case Priority.low:
      return <Typography>Low Priority</Typography>
    case Priority.normal:
      return <Typography>Normal Priority</Typography>
    case Priority.high:
      return <Typography>High Priority</Typography>
  }

  return null
}
