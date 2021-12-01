import FortIcon from "@mui/icons-material/Fort"
import FortBorderIcon from "@mui/icons-material/FortOutlined"
import { Rating, Stack, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"
import { useField } from "formik"
import React, { useMemo } from "react"
import { ChallengeRating } from "../../core/models/ChallengeRating"

interface Props {
  index: number
}

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": { color: "#ff6d75" },
  "& .MuiRating-iconHover": { color: "#ff3d47" },
})

export const ChallengeComponent: React.FC<Props> = (props) => {
  const { index } = props
  const [field, _meta, helper] = useField<ChallengeRating>(
    `tasks[${index}].challenge`
  )

  const onChange = (_event: any, value: number | null) => {
    if (value) {
      helper.setValue(value)
    } else {
      helper.setValue(ChallengeRating.Normal)
    }
  }

  const challengeText = useMemo(() => {
    switch (field.value) {
      case ChallengeRating.Minor:
        return "Challange: Minor"
      case ChallengeRating.Easy:
        return "Challenge: Easy"
      case ChallengeRating.Normal:
        return "Challenge: Normal"
      case ChallengeRating.Hard:
        return "Challenge: Hard"
      case ChallengeRating.Involved:
        return "Challenge: Involved"
    }
  }, [field.value])

  return (
    <Stack>
      <StyledRating
        onChange={onChange}
        value={field.value}
        max={5}
        icon={<FortIcon fontSize="inherit" />}
        emptyIcon={<FortBorderIcon fontSize="inherit" />}
      />
      <Typography>{challengeText}</Typography>
    </Stack>
  )
}
