import { Box, CircularProgress } from "@mui/material"
import React from "react"

interface Props {
  whatIsLoading: string
}

export const LoadingSpinner: React.FC<Props> = (props) => {
  let loadingString = "Loading"
  if (process.env.NODE_ENV === "development") {
    loadingString += ` ${props.whatIsLoading}`
  }
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        width: "50%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
      <div>{loadingString}</div>
    </Box>
  )
}
