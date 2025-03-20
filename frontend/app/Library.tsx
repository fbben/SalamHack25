import { VStack } from "@/components/ui/vstack";
import Heading from "@/components/custom/Library/Heading";
import Main from "@/components/custom/Library/main";

export default function Library() {
  return (
    <VStack className="gap-8 flex-1">
      <Heading />
      <Main />
    </VStack>
  );
}
