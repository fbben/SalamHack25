import { VStack } from "@/components/ui/vstack";
import Heading from "@/components/custom/Library/Heading";
import Main from "@/components/custom/Library/main";
import Footer from "@/components/custom/Footer";

export default function Library() {
  return (
    <>
      <VStack className="gap-8 flex-1">
        <Heading />
        <Main />
      </VStack>
      <Footer />
    </>
  );
}
