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
    setForm((prev) => ({ ...prev, [id]: type === "checkbox" ? checked : value }));

    const next = { ...form, [id]: type === "checkbox" ? checked : value };
    const v = validate(next);
    setErrors(v);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate(form);
    setErrors(v);
    if (Object.keys(v).length > 0) return;
    await onSubmit(form);
  };

  return { form, setForm, errors, setErrors, handleChange, handleSubmit };
};
