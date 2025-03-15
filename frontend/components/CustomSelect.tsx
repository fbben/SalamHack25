import React from "react";
import { Select, SelectContent, SelectIcon, SelectInput, SelectItem, SelectPortal, SelectTrigger } from "@/components/ui/select";
import { ChevronDownIcon } from "@/components/ui/icon";

const CustomSelect = ({ placeholder, options }: any) => {
  return (
    <Select className="flex-1">
      <SelectTrigger variant="outline">
        <SelectIcon className="mr-3" as={ChevronDownIcon} />
        <SelectInput placeholder={placeholder} />
      </SelectTrigger>
      <SelectPortal>
        <SelectContent>
          {options.map((option: any) => (
            <SelectItem key={option.value} label={option.label} value={option.value} />
          ))}
        </SelectContent>
      </SelectPortal>
    </Select>
  );
};

export default CustomSelect;
