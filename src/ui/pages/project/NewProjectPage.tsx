import { TextField } from "@mui/material";
import { Formik } from "formik";
import React, { useContext, useMemo } from "react";
import { UpcertProject } from "../../../core/forms/Project.form";
import { AuthContext } from "../../AuthGate";
import { TaskListForm } from "../../form_components/TaskListForm";

export const NewProjectPage: React.FC = () => {
  const { user } = useContext(AuthContext);

  const formSubmit = (value: UpcertProject) => {};

  const initialValues: UpcertProject = useMemo(
    () => ({
      name: "",
      owner: user,
      tasks: [],
    }),
    []
  );

  return (
    <>
      <h1>New Quest</h1>
      <Formik onSubmit={formSubmit} initialValues={initialValues}>
        {({ handleSubmit }) => (
          <>
            <TextField name="name" label="Quest Name" />
            <TaskListForm />
          </>
        )}
      </Formik>
    </>
  );
};
