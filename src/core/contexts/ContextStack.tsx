import adapter from "@date-io/luxon";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import React from "react";
import { FirebaseProvider } from "./FirebaseContext";

export const ContextStack: React.FC = (props) => {
  return (
    <FirebaseProvider>
      <LocalizationProvider dateAdapter={adapter}>
        {props.children}
      </LocalizationProvider>
    </FirebaseProvider>
  );
};
