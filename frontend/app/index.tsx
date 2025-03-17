import { Input, InputField, InputSlot } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import CustomSelect from "@/components/custom/CustomSelect";
import { styles } from "@/styles";
export default function StoryGenerator() {

    return (
        <VStack className="p-5 gap-8">
            <VStack>
                {/* return icon here */}
                <Text className={`${styles.header1} ${styles.yellow}`}>ولِّد قصّة مُبهرة لطفلك!</Text>
                <Text className={`${styles.header2} ${styles.gray1}`}>بالصورة والصوت</Text>
            </VStack>
            <VStack className="gap-3">
                <Text className={`${styles.header2}`}>تفاصيل القصّة:</Text>
                <Text className={`${styles.par1} ${styles.gray1}`} >فكرة القصّة الأساسيّة:</Text>
                <Input>
                    <InputField className={`${styles.par2}`} placeholder="اكتب الفكرة الأساسيّة" />
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
                <Text className={`${styles.par1} ${styles.gray1}`}>خصائص متقدّمة:</Text>
                <Input>
                    <InputField className={`${styles.par2} ${styles.gray2}`} placeholder="حدّد اسم البطل أو تفاصيل أخرى" />
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
                    <InputField className={`${styles.par2} ${styles.gray2}`} placeholder="المغزى أو العبرة من القصّة" />
                </Input>
                <Button className={`${styles.yellow_button}`}><ButtonText className={`${styles.par2} ${styles.gray1}`}>توليد</ButtonText></Button>
            </VStack>
        </VStack>
    );
}