import React, { useState } from 'react';
import Select from 'react-select';


const SelectCategory = ({onSelectCategory, categories}) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const cateList = [];

  categories.map((category) => cateList.push({label: category.cateName, id: category.id}));

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption);
    onSelectCategory(selectedOption.id)
  };

  return (
    <div>
      <Select
        value={selectedCategory}
        onChange={handleCategoryChange}
        options={cateList}
        isMulti={false}
        placeholder = "Chọn thể loại"
      />
    </div>
  );
};

export default SelectCategory;