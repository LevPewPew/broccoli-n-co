import React, { useRef, useState } from "react";
import {
  Box,
  Input,
  VStack,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Button,
  Alert,
  AlertIcon,
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
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    watch,
  } = useForm();
  const emailValue = useRef({});
  emailValue.current = watch("email", "");
  const emailFormatRegex = /\S+@\S+\.\S+/;

  const postFormData = async (values: FormData) => {
    setSubmitError(null);

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
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        onSubmit();
      } else {
        const data = await response.json();
        setSubmitError(data.errorMessage);
      }
    } catch (error) {
      setSubmitError(error);
    }
  };

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
        <VStack spacing={4} mt={8}>
          <Button
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit"
            width="100%"
          >
            Submit
          </Button>
          {submitError && (
            <Alert status="error" borderRadius="0.4rem">
              <AlertIcon />
              {submitError}
            </Alert>
          )}
        </VStack>
      </form>
    </Box>
  );
};
