import { UploadFile } from "@mui/icons-material";
import { FormControl, FormHelperText, Typography } from "@mui/material";
import React, { useCallback } from "react";
import { useDropzone, DropzoneOptions } from "react-dropzone";
import { UseControllerProps, useController } from "react-hook-form";

interface Props extends UseControllerProps {}

export default function AppDropzone(props: Props) {
  const { field, fieldState } = useController({ ...props, defaultValue: null });

  const dzStyles = {
    display: 'flex',
    border: 'dashed 3px #eee',
    borderColor: '#eee',
    borderRadius: '5px',
    paddingTop: '30px',
    alignItems: 'center',
    height: 200,
    width: 500
  }

  const dzActive = {
    borderColor: 'green'
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const modifiedFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    field.onChange(modifiedFiles[0]);
  }, [field]);

  const dropzoneOptions: DropzoneOptions = {
    onDrop,
    multiple: false,
    onDragEnter: () => {},
    onDragOver: () => {},
    onDragLeave: () => {},
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone(dropzoneOptions);
    

  return (
    <div {...getRootProps()}>
      <FormControl style={isDragActive ? {...dzStyles, ...dzActive}: dzStyles}>
        <input {...getInputProps()}/>
        <UploadFile sx={{fontSize: '100px'}} />
        <Typography>Drop image here!</Typography>
        <FormHelperText>{fieldState.error?.message}</FormHelperText>
      </FormControl>
    </div>
  );
}






