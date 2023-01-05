import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import * as React from "react";

export default function PreviewImage({ itemData, height, width, singleimg }) {
  return (
    <ImageList
      sx={{ width: width, height: height }}
      cols={singleimg ? 1 : 3}
      rowHeight={164}
    >
      {itemData.map((item) => (
        <ImageListItem key={item}>
          <img src={`${item}`} srcSet={`${item}`} alt={item} loading="lazy" />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
