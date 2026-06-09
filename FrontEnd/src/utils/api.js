export const checkFieldAvailability = async (field, value) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/check-field?field=${field}&value=${encodeURIComponent(value)}`);
    const data = await res.json();
    return data.exists;
  } catch (err) {
    console.error(`Erreur vérification ${field}:`, err);
    return false;
  }
};