import { Input, InputField, InputSlot } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import CustomSelect from "@/components/CustomSelect";
import { styles } from "@/styles";
export default function StoryGenerator() {

    return (
        <VStack className="p-5 gap-8">
            <VStack>
                {/* return icon here */}
                <Text className="font-readex-bold text-4xl color-[#FECC32] text-right">ولِّد قصّة مُبهرة لطفلك!</Text>
                <Text className="font-readex-semibold text-2xl color-[#484C52] text-right">بالصورة والصوت</Text>
            </VStack>
            <VStack className="gap-3">
                <Text className="text-2xl font-bold text-black text-right">تفاصيل القصّة:</Text>
                <Text className="text-xl color-[#484C52] text-right">فكرة القصّة الأساسيّة:</Text>
                <Input>
                    <InputField className="font-readex-regular text-sm text-right" placeholder="اكتب الفكرة الأساسيّة" />
                </Input>

                <HStack className=" flex-1 flex-row gap-2 mb-10">
                    <CustomSelect
                        placeholder="الأسلوب"
                        options={[
                            { label: "الثيمة 1", value: "الثيمة 1" },
                            { label: "الثيمة 2", value: "الثيمة 2" },
                            { label: "الثيمة 3", value: "الثيمة 3" },
                        ]} />
                    <CustomSelect
                        placeholder="اختر الثيمة"
                        options={[
                            { label: "الثيمة 1", value: "الثيمة 1" },
                            { label: "الثيمة 2", value: "الثيمة 2" },
                            { label: "الثيمة 3", value: "الثيمة 3" },
                        ]} />
                </HStack>
                <Text className="text-xl color-[#484C52] text-right">خصائص متقدّمة:</Text>
                <Input>
                    <InputField className="text-sm text-right" placeholder="حدّد اسم البطل أو تفاصيل أخرى" />
                </Input>

                <HStack className=" flex-1 flex-row gap-2 mb-10">
                    <CustomSelect
                        placeholder="طول القصّة"
                        options={[
                            { label: "الثيمة 1", value: "الثيمة 1" },
                            { label: "الثيمة 2", value: "الثيمة 2" },
                            { label: "الثيمة 3", value: "الثيمة 3" },
                        ]} />
                    <CustomSelect
                        placeholder="عدد الشخصيّات"
                        options={[
                            { label: "الثيمة 1", value: "الثيمة 1" },
                            { label: "الثيمة 2", value: "الثيمة 2" },
                            { label: "الثيمة 3", value: "الثيمة 3" },
                        ]} />
                </HStack>
                <Input>
                    <InputField className="text-sm text-right" placeholder="المغزى أو العبرة من القصّة" />
                </Input>
                <Button className="bg-[#FECC32] hover:bg-yellow-400 "><ButtonText className="text-sm text-[#484C52]">توليد</ButtonText></Button>
          <Text className={`${styles.header1}`}>مرّة أخرى</Text>
            </VStack>
        </VStack>
    );
}