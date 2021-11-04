import { BaseTextFieldProps, TextField as TextInput } from "@mui/material";
import { useFormikContext } from "formik";
import React from "react";

interface Props extends BaseTextFieldProps {
  name: string;
  serverError?: string;
}

export const TextField: React.FC<Props> = (props) => {
  const { values, setFieldValue, errors } = useFormikContext();
  const errorObject = errors as { [key: string]: string };
  const valueObject = values as { [key: string]: string };
  const { name, error, label, serverError, ...passedProps } = props;
  const formikError: string | undefined = errorObject[name];
  const value = valueObject[name];
  const errorText: string | undefined = serverError ? serverError : formikError;
  const hasError = errorText !== undefined;

  const setText = (event: any) => {
    setFieldValue(name, event.target.value);
  };
  return (
    <>
      <TextInput
        {...passedProps}
        onChange={setText}
        value={value}
        label={hasError ? errorText : label}
        error={hasError}
        variant="outlined"
      />
    </>
  );
};
