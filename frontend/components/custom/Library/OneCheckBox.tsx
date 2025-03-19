import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from "@/components/ui/checkbox";
import { CheckIcon } from "@/components/ui/icon";
import { styles } from "@/styles";

export default function OneCheckBox({ title }: { title: string }) {
  return (
    <Checkbox className="justify-between" value={title}>
      <CheckboxLabel className={`${styles.par2}`}>{title}</CheckboxLabel>
      <CheckboxIndicator>
        <CheckboxIcon as={CheckIcon} />
      </CheckboxIndicator>
    </Checkbox>
  );
}
