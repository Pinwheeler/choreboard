import { Paper, useTheme } from "@mui/material"
import React, { useEffect } from "react"
import { Helmet } from "react-helmet"

export const AppContainer: React.FC = (props) => {
  const theme = useTheme()

  useEffect(() => {
    window.document.body.style.backgroundColor =
      theme.palette.background.default
  }, [theme.palette.background.default])

  return (
    <>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&family=Ubuntu+Mono&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <Paper
        style={{
          backgroundColor: theme.palette.background.default,
        }}
      >
        {props.children}
      </Paper>
    </>
  )
}
