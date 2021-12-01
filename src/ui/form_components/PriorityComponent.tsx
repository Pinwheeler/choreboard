import { Rating, Stack, Typography } from "@mui/material"
import { useField } from "formik"
import React, { useMemo } from "react"
import { Priority } from "../../core/models/Priority.model"

interface Props {
  index: number
}

export const PriorityComponent: React.FC<Props> = (props) => {
  const { index } = props
  const [field, _meta, helper] = useField<Priority>(`tasks[${index}].priority`)

  const onChange = (_event: any, value: number | null) => {
    if (value) {
      helper.setValue(value)
    } else {
      helper.setValue(Priority.normal)
    }
  }

  const priorityText = useMemo(() => {
    switch (field.value) {
      case Priority.low:
        return "Low Priority"
      case Priority.normal:
        return "Normal Priority"
      case Priority.high:
        return "High Priority"
    }
  }, [field.value])

  return (
    <Stack>
      <Rating onChange={onChange} value={field.value} max={3} />
      <Typography>{priorityText}</Typography>
    </Stack>
  )
}
