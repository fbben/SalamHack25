import {
  Checkbox,
  CheckboxGroup,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from "@/components/ui/checkbox";
import { HStack } from "@/components/ui/hstack";
import React from "react";
import OneCheckBox from "./OneCheckBox";

export default function FilterCheckBox({
  filter,
  setFilter,
}: {
  filter: string[];
  setFilter: (arg0: string[]) => void;
}) {
  const [values, setValues] = React.useState<string[]>([]);

  const handleChange = (newValues: string[]) => {
    setValues(newValues);
    setFilter(newValues);
  };

  const filterItems = filter.map((item) => {
    return <OneCheckBox key={item} title={item} />;
  });

  return (
    <CheckboxGroup value={values} onChange={handleChange}>
      <HStack space="2xl" className="flex-wrap flex-row-reverse my-2">
        {filterItems}
      </HStack>
    </CheckboxGroup>
  );
}
