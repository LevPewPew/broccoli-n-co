import { FormValues } from "components/InviteForm";

export const postFormData = async (
  values: FormValues,
  onOkResponse: () => void,
  setSubmitError: React.Dispatch<React.SetStateAction<string | null>>
) => {
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
      onOkResponse();
    } else {
      const data = await response.json();
      setSubmitError(data.errorMessage);
    }
  } catch (error) {
    setSubmitError(error);
  }
};
