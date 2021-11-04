import { Box, Container, Paper } from "@mui/material";
import React from "react";

export const AppContainer: React.FC = (props) => {
  return (
    <Container maxWidth="xl">
      <Paper style={{ padding: 15, marginTop: 20 }}>
        <Box
          style={{
            display: "flex",
            minHeight: 450,
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {props.children}
        </Box>
      </Paper>
    </Container>
  );
};
