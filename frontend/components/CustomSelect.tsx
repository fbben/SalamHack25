import React from "react";
import { Select, SelectContent, SelectIcon, SelectInput, SelectItem, SelectPortal, SelectTrigger } from "@/components/ui/select";
import { ChevronDownIcon } from "@/components/ui/icon";
import { styles } from "@/styles";

const CustomSelect = ({ placeholder, options }: any) => {
  return (
    <Select className="flex-1">
      <SelectTrigger className="h-[40px]" variant="outline">
        <SelectIcon className="mr-3" as={ChevronDownIcon} />
        <SelectInput className={`${styles.par2}`} placeholder={placeholder} />
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
