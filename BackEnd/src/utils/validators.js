import rules from "../config/rules.js";

/**
 * Vérifie si une chaîne est un email valide
 */
export const isValidEmail = (identifier) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(identifier);
};

/**
 * Vérifie si la longueur du mot de passe respecte le minimum requis
 * @param {string} password - Le mot de passe à tester
 * @returns {boolean} - True si la longueur est suffisante
 */
export const isPasswordValidLength = (password) => {
  // On s'assure que password existe pour éviter de lire .length sur undefined
  return password && password.length >= rules.minPasswordLength;
};

/**
 * Vérifie la force du mot de passe (Critères de sécurité)
 * @param {string} password - Le mot de passe à tester
 * @returns {boolean} - True si : 8+ caractères, 1 majuscule, 1 chiffre
 */
export const isStrongPassword = (password) => {
  // On réutilise la validation de longueur + tests Regex
  return (
    isPasswordValidLength(password) && 
    /[A-Z]/.test(password) && // Contient au moins une majuscule
    /[0-9]/.test(password)    // Contient au moins un chiffre
  );
};