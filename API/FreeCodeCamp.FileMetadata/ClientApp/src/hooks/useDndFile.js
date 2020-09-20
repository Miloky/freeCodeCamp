import { useEffect, useState } from 'react';

const useDndFiles = (element, params) => {
  const [files, setFiles] = useState([]);
  useEffect(() => {
    const inputRef = createInput();
    const clickHandler = () =>{
      if (!inputRef) {
        return;
      }
      inputRef.click();
    }
    const current  = element && element.current;
    if (current) {
      inputRef.addEventListener('change', changeHandler);
      current.addEventListener('dragenter', handleDragEnter);
      current.addEventListener('dragover', haleDragOver);
      current.addEventListener('drop', handleDrop);
      current.addEventListener('click', clickHandler);
    }
    return () => {
      if (current) {
        inputRef.removeEventListener('change', changeHandler);
        current.removeEventListener('dragenter', handleDragEnter);
        current.removeEventListener('dragover', haleDragOver);
        current.removeEventListener('drop', handleDrop);
        current.removeEventListener('click', clickHandler);
      }
    };
  }, []);


  const addFiles = fileList => {
    let result = toArray(fileList, params?.beforeFileAdded);
    setFiles(Array.prototype.concat.call(files, result));
  };

  const changeHandler = (event) => {
    const fileList = event.target.files;
    if (fileList && fileList.length) {
      addFiles(fileList);
    }
  };

  const createInput = () => {
    const $input = document.createElement('input');
    $input.type = 'file';
    $input.style.display = 'none';
    $input.name = 'upfile';
    $input.multiple = true;
    element.current.append($input);
    return $input;
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const haleDragOver = event => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = event => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files && files.length) {
      addFiles(files);
    }
  };

  const toArray = (fileList, filter) => {
    const result = [];
    let index = fileList.length;
    let resultIndex = 0;
    while (index--) {
      let file = fileList[index];
      if(filter){
        file = filter(file);
      }
      file&& (result[resultIndex++] = file)

    }
    return result;
  };

  const removeFile = file => {
    const filteredFiles = files.filter(x => x !== file);
    setFiles(filteredFiles);
  };

  return [files, {removeFile}];
};

export default useDndFiles;
