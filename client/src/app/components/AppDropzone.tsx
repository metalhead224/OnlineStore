import React, { useCallback, useRef } from "react";
import { useDropzone, DropzoneOptions } from "react-dropzone";
import { UseControllerProps, useController } from "react-hook-form";

interface Props extends UseControllerProps {}

export default function AppDropzone(props: Props) {
  const { field } = useController({ ...props, defaultValue: null });

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
  
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleRef = useCallback((node: HTMLInputElement) => {
    if (node) {
      inputRef.current = node;
    }
  }, []);

  return (
    <div {...getRootProps()}>
      <input ref={handleRef} {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
}






