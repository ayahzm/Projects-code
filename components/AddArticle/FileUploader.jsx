import { WidthNormal } from '@mui/icons-material';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const FileUploader = () => {
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    // Here you can handle the uploaded files, for example, uploading to a server
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} style={styles.dropzone}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p style={{fontSize: 18}}>Drag article's picture here...</p>
      }
    </div>
  );
};

const styles = {
  dropzone: {
    border: '2px dashed #cccccc',
    borderRadius: '5px',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
    color: '#333333',
    width:"400px"
  }
};

export default FileUploader;