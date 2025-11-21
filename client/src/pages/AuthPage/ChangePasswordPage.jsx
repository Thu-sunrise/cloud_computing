import React from "react";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import FloatingInput from "../../components/Form/FloatingInput";
import { useForm } from "../../hooks/useForm";
import { validateChangePassword } from "../../utils/validate";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";

const ChangePasswordPage = () => {
  const { changePassword } = useAuth();

  const { form, errors, handleChange, handleSubmit } = useForm({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validate: validateChangePassword,
    onSubmit: async (values) => {
      try {
        await changePassword(values);
        toast.success("Password changed successfully!");
      } catch (err) {
        toast.error(err.message);
      }
    },
  });

  return (
    <AuthLayout title="Change Password">
      <p className="form-subtitle">Update your account password</p>
      <form onSubmit={handleSubmit} className="auth-form" noValidate>
        <FloatingInput
          id="oldPassword"
          type="password"
          label="Old Password"
          value={form.oldPassword}
          onChange={handleChange}
          error={errors.oldPassword}
        />
        <FloatingInput
          id="newPassword"
          type="password"
          label="New Password"
          value={form.newPassword}
          onChange={handleChange}
          error={errors.newPassword}
        />
        <FloatingInput
          id="confirmPassword"
          type="password"
          label="Confirm New Password"
          value={form.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />

        <button type="submit" className="btn-primary">
          Update Password
        </button>
      </form>
    </AuthLayout>
  );
};

export default ChangePasswordPage;
