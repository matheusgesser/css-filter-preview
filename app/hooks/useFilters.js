import { initialState } from '@/(home)/initialState';
import { useEffect, useState } from 'react'

export function useFilters() {
    const [filters, setFilters] = useState(initialState);
    const listedItems = filters.filter((item) => item.listing);
    const unlistedItems = filters.filter((item) => !item.listing);
    const [cssCode, setCssCode] = useState("");

    const handleListFilter = (filter) => {
      const editIndex = filters.findIndex((item) => item.value == filter);
      let newFilters = [...filters];
      newFilters[editIndex] = {
        ...newFilters[editIndex],
        listing: true,
      };
      setFilters(newFilters);
    }

    const handleUnlistFilter = (filter) => {
      const editIndex = filters.findIndex((item) => item.value == filter);
      let newFilters = [...filters];
      newFilters[editIndex] = {
        ...newFilters[editIndex],
        currentValue: newFilters[editIndex].defaultValue,
        listing: false,
      };
      setFilters(newFilters);
    }

    const handleChangeFilterValue = (value, filter) => {
      const editIndex = filters.findIndex((item) => item.value == filter);
      let newFilters = [...filters];
      newFilters[editIndex] = {
        ...newFilters[editIndex],
        currentValue: parseInt(value),
      };
      setFilters(newFilters);
    }

    useEffect(() => {
        let appliedFilters = filters.filter(
          (item) => item.currentValue != item.defaultValue
        );
        let newCss = "";
        appliedFilters.forEach((filter) => {
          newCss =
            `${newCss} ${filter.value}(${filter.currentValue}${filter.unit})`.trim();
        });
        setCssCode(newCss);
    }, [filters])

  return {
    cssCode,
    listedItems,
    unlistedItems,
    handleListFilter,
    handleUnlistFilter,
    handleChangeFilterValue,
  };
}