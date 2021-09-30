import React, { useRef } from "react";
import {
  Box,
  Input,
  VStack,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Button,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

interface Props {
  onSubmit: () => void;
}

interface FormData {
  fullName: string;
  email: string;
  confirmEmail: string;
}

export const RequestInviteForm = ({ onSubmit }: Props) => {
  const handleSendButtonClick = () => {
    // NEXT actually submit the form data
    console.log("the form data to start");
    onSubmit();
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    watch,
  } = useForm();

  const emailValue = useRef({});
  emailValue.current = watch("email", "");

  // NEXT fix any, probably an interface of the form data expected
  const postFormData = async (values: FormData) => {
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     alert(JSON.stringify(values, null, 2));
    //     // @ts-ignore
    //     resolve();
    //   }, 2000);
    // });

    const authEndpoint =
      "https://us-central1-blinkapp-684c1.cloudfunctions.net/fakeAuth";

    const authBody = {
      name: values.fullName,
      email: values.email,
    };

    try {
      const response = await fetch(authEndpoint, {
        method: "POST",
        body: JSON.stringify(authBody),
      });
      const data = await response.json();
      alert(JSON.stringify(data, null, 2));
    } catch (dasErr) {
      console.log({ dasErr });
    }
    // https://us-central1-blinkapp-684c1.cloudfunctions.net/fakeAuth
  };

  // NEXT add 3 chars long minimum name format
  // NEXT add email format validation
  return (
    <Box>
      <form onSubmit={handleSubmit(postFormData)}>
        <VStack spacing={4}>
          <FormControl isInvalid={errors.fullName}>
            <FormLabel htmlFor="full-name">Full name</FormLabel>
            <Input
              id="full-name"
              {...register("fullName", {
                required: "Required",
              })}
            />
            <FormErrorMessage>
              {errors.fullName && errors.fullName.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.email}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              {...register("email", {
                required: "Required",
              })}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.confirmEmail}>
            <FormLabel htmlFor="confirm-email">Confirm email</FormLabel>
            <Input
              id="confirm-email"
              {...register("confirmEmail", {
                required: "Required",
                validate: (value) =>
                  value === emailValue.current || "Emails do not match",
              })}
            />
            <FormErrorMessage>
              {errors.confirmEmail && errors.confirmEmail.message}
            </FormErrorMessage>
          </FormControl>
        </VStack>
        <Button
          mt={8}
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit"
          width="100%"
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};
