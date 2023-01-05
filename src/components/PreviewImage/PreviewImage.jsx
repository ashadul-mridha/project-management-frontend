import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import * as React from "react";

export default function PreviewImage({ itemData }) {
  return (
    <ImageList sx={{ width: 750, height: 500 }} cols={3} rowHeight={164}>
      {itemData.map((item) => (
        <ImageListItem key={item}>
          <img src={`${item}`} srcSet={`${item}`} alt={item} loading="lazy" />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
