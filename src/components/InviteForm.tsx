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
  onSubmit: (values: FormValues) => void;
}

export interface FormValues {
  fullName: string;
  email: string;
  confirmEmail: string;
}

export const InviteForm = ({ onSubmit }: Props) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    watch,
  } = useForm();
  const emailValue = useRef({});
  emailValue.current = watch("email", "");
  const emailFormatRegex = /\S+@\S+\.\S+/;

  const submitForm = (values: FormValues) => {
    return onSubmit(values);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(submitForm)}>
        <VStack spacing={4}>
          <FormControl isInvalid={errors.fullName}>
            <FormLabel htmlFor="full-name">Full name</FormLabel>
            <Input
              id="full-name"
              {...register("fullName", {
                required: "Required",
                minLength: { value: 3, message: "Minimum of 3 characters" },
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
                pattern: {
                  value: emailFormatRegex,
                  message: "Invalid email format",
                },
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
                pattern: {
                  value: emailFormatRegex,
                  message: "Invalid email format",
                },
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
          colorScheme="green"
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
