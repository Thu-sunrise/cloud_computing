import { useState } from "react";

export const useForm = ({
  initialValues = {},
  validate = () => ({}),
  onSubmit = async () => {},
}) => {
  const [form, setForm] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setForm((prev) => {
      const next = { ...prev, [id]: type === "checkbox" ? checked : value };
      const validationErrors = validate(next);
      setErrors(validationErrors);
      return next;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    await onSubmit(form);
  };

  return { form, setForm, errors, setErrors, handleChange, handleSubmit };
};
