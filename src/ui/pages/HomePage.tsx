import { Button, Typography } from "@mui/material";
import React from "react";

export const HomePage: React.FC = () => {
  return (
    <>
      <Typography variant="h1">QuestLog</Typography>
      <Button variant="contained" href="/projects/new">
        New Quest
      </Button>
    </>
  );
};
