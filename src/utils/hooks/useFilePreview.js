/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

export default function useFilePreview(file) {

  const [imgSrc, setImgSrc] = useState(null);

  useEffect(() => {

    if ( file && file[0]) {

      const fileUrls = [];
      const files = Object.values(file);

      for (const image of files) {
        const newUrl = URL.createObjectURL(image);
        fileUrls.push(newUrl);
      }

      if (fileUrls !== imgSrc) {
        setImgSrc(fileUrls);
      }

    }
    
  }, [file]);

  return [imgSrc, setImgSrc];
}