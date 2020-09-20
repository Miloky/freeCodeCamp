export const isImgExtension = name => {
  const imageExtensions = ['gif', 'ico', 'jpeg', 'jpg', 'tga', 'tiff', 'tif', 'svg', 'png', 'webp'];
  const ext = getExtension(name);
  return imageExtensions.indexOf(ext) > -1;
};

export const isPdfExtension = name =>{
  return getExtension(name) === 'pdf';
}

export const isSvgExtension = name => {
  const ext = getExtension(name);
  return ext === 'svg';
};

export const getExtension = name => {
  if (!name) {
    return '';
  }
  return name.slice(((name.lastIndexOf('.') - 1) >>> 0) + 2).trim();
};

// TODO: Fix wrong calculation
export const bytesToMb = bytes =>{
  if(!bytes) return 0;
  return  Math.floor(bytes/Math.pow(1000, 2));
}

export const readFileAsBase64Async = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.addEventListener('load', () => {
      resolve({
        name: file.name,
        body: reader.result
      });
    });

    reader.addEventListener('error', (error) => {
      reject({
        message: error.message,
        name: file.name
      });
    });
  });
};