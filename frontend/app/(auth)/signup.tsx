import React from "react";

import { View } from "react-native";
import { Input, InputField, InputSlot } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import CustomSelect from "@/components/custom/CustomSelect";
import { styles } from "@/styles";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlErrorIcon,
  FormControlLabel,
  FormControlLabelText,
  FormControlHelper,
  FormControlHelperText,
} from "@/components/ui/form-control";

import { Heading } from "@/components/ui/heading";
import { InputIcon } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import { AlertCircleIcon } from "@/components/ui/icon";

import {
  Checkbox,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxIcon,
} from "@/components/ui/checkbox";
import { CheckIcon } from "@/components/ui/icon";

import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

export default function SignupScreen() {
  return (
    <VStack className="p-5 gap-3">
      <VStack>
        {/* return icon here */}
        <Text className={`${styles.header1} ${styles.yellow} `}>التسجيل</Text>
      </VStack>
      <VStack className="gap-3">
        <Text className={`${styles.par1} ${styles.gray1}`}>اسم المستخدم</Text>
        <Input>
          <InputField
            className={`${styles.par2}`}
            placeholder="أدخل اسم المستخدم الخاص بك"
          />
        </Input>

        <Text className={`${styles.par1} ${styles.gray1}`}>
          البريد الإلكترونيّ
        </Text>
        <Input>
          <InputField
            className={`${styles.par2} ${styles.gray2}`}
            placeholder="أدخل بريدك الإلكتروني"
          />
        </Input>
        <Text className={`${styles.par1} ${styles.gray1}`}>كلمة السّرّ</Text>
        <Input>
          <InputField
            className={`${styles.par2} ${styles.gray2}`}
            placeholder="أدخل كلمة السّرّ"
          />
        </Input>
        <Text className={`${styles.par1} ${styles.gray1}`}>
          تأكيد كلمة السّرّ
        </Text>
        <Input>
          <InputField
            className={`${styles.par2} ${styles.gray2}`}
            placeholder="أدخل كلمة السّرّ"
          />
        </Input>

        <Checkbox
          value=""
          className="flex flex-row-reverse"
          size="md"
          isInvalid={false}
          isDisabled={false}
        >
          <CheckboxIndicator>
            <CheckboxIcon as={CheckIcon} />
          </CheckboxIndicator>
          <CheckboxLabel>
            <Text className={`${styles.par2} ${styles.gray1}`}>تذكّرني</Text>
          </CheckboxLabel>
        </Checkbox>

        <Button className={`${styles.yellow_button}`}>
          <ButtonText className={`${styles.par1} ${styles.gray1}`}>
            تسجيل الدّخول
          </ButtonText>
        </Button>

        <HStack className="text-stone-500 mt-2">
          <Text className={`${styles.par2} mx-auto`}>_______________</Text>
          <Text className={`${styles.par1} mx-auto `}>
            أو المتابعة باستخدام
          </Text>
          <Text className={`${styles.par2} mx-auto`}>_______________</Text>
        </HStack>

        <HStack className="mx-auto gap-10">
          <FontAwesome name="google" size={30} color="grey" />
          <FontAwesome name="twitter" size={30} color="grey" />
        </HStack>

        <HStack className="flex-row-reverse mx-auto gap-2 mt-2">
          <Text className={`${styles.par1} text-black mx-auto `}>
            لديك حساب؟
          </Text>
          <Text
            className={`${styles.par1} ${styles.yellow} underline text-black mx-auto `}
          >
            تسجيل الدّخول
          </Text>
        </HStack>
      </VStack>
    </VStack>
  );
}
