import { Box, Image, Menu, Select } from "grommet";
import React from "react";

export default function CategoriesDropDown({ categories, onChange }) {
  const formatCategories = categories.map((cate) => ({
    label: (
      <Box align="center" gap="1em" direction="row">
        <Image width="50" height="50" src={cate.imageUrl} />
        {cate.name}
      </Box>
    ),
    onClick: () => onChange(cate),
  }));
  return <Menu label="Categories" items={formatCategories} />;
}
