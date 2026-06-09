import { useState, useEffect, useMemo } from "react";
import { useMultiStepForm } from "../shared/useMultiStepForm";
import { useAuth } from "../../hooks/auth/useAuth";
import { checkFieldAvailability } from "../../utils/api";

export const useAuthSignupSteps = (onSubmit, setError, initialData = {}) => {
  const { register } = useAuth();
  const [rules, setRules] = useState(null);

  const validateUsername = async (value) => {
    if (!value || value.length < 3) return "Pseudo trop court";
    const exists = await checkFieldAvailability('username', value);
    return exists ? "Ce pseudo est déjà utilisé" : null;
  };

  const validateEmail = async (value) => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Email invalide";
    const exists = await checkFieldAvailability('email', value);
    return exists ? "Cet email est déjà utilisé" : null;
  };

  const validatePassword = (value) => {
    if (!rules) return null;
    return value.length >= rules.minPasswordLength
      ? null
      : `Le mot de passe doit contenir au moins ${rules.minPasswordLength} caractères`;

  };

  const steps = [
    { fields: [{ name: "firstname", placeholder: "Prénom", type: "text" }] },
    { fields: [{ name: "lastname", placeholder: "Nom", type: "text" }] },
    { fields: [{ name: "username", placeholder: "Nom d'utilisateur", type: "text", validation: validateUsername }] },
    { fields: [{ name: "email", placeholder: "Email", type: "email", validation: validateEmail }] },
    { fields: [{ name: "password", placeholder: "Mot de passe", type: "password", validation: validatePassword }] },
  ];

  const formMethods = useMultiStepForm(
    steps,
    { firstname: "", lastname: "", email: "", password: "", username: "", ...initialData },
    async (data) => {
      try {
        setError(null);
        await register(data);
        onSubmit && onSubmit(data);
      } catch (err) {
        setError(err.message || "Une erreur est survenue");
      }
    },
    setError
  );

  const isCompleted = useMemo(() => {
    return steps.every((step) =>
      step.fields.every((field) => {
        const isRequired = field.required ?? step.fields.length === 1;

        if (!isRequired) return true;

        const value = formMethods.formData[field.name];

        if (value === undefined || value === null) return false;
        if (typeof value === "string" && value.trim() === "") return false;
        if (field.validation) return field.validation(value) === null;

        return true;
      })
    );
  }, [steps, formMethods.formData]);

  useEffect(() => {
    const fetchRules = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/rules`);
        const data = await res.json();
        setRules(data);
      } catch (err) {
        console.error("Erreur fetch rules :", err);
      }
    };
    fetchRules();
  }, []);

  return { ...formMethods, rules, isCompleted };
};
