import React from "react";
import { Select, SelectContent, SelectIcon, SelectInput, SelectItem, SelectPortal, SelectTrigger } from "@/components/ui/select";
import { ChevronDownIcon } from "@/components/ui/icon";
import { styles } from "@/styles";

const CustomSelect = ({ placeholder, options, value, onSelect}: any) => {
  
  return (
    <Select className="flex-1" onValueChange={onSelect}>
      <SelectTrigger className="h-[40px] flex justify-between" variant="outline">
        <SelectIcon className="mr-3" as={ChevronDownIcon} />
        <SelectInput className={`${styles.par2}`} placeholder={placeholder} value={value} />
      </SelectTrigger>
      <SelectPortal>
        <SelectContent>
          {options.map((option: any) => (
            <SelectItem className={`${styles.par2}`} key={option.value} label={option.label} value={option.value} />
          ))}
        </SelectContent>
      </SelectPortal>
    </Select>
  );
};

export default CustomSelect;
