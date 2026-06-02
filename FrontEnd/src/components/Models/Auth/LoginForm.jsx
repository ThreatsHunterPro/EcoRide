import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/auth/useAuth';
import FormInput from '../../Shared/FormInput';
import Button from '../../Shared/Button';

export default function LoginForm({ setError }) {
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({ identifier: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const userData = await login(credentials);

      if (userData.user.role === 'admin') {
        navigate('/dashboard');
      } 

      else if (userData.user.role === 'user') {
        navigate('/');
      } 

      else {
        navigate('/');
      }
    } 
    
   catch (err) {
      setError(err.message === "Failed to fetch" ? "Une erreur est survenue" : err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <FormInput
        placeholder="Nom d'utilisateur ou email"
        name="identifier"
        type="text"
        value={credentials.identifier}
        onChange={handleChange}
      />
      <FormInput
        placeholder="Mot de passe"
        name="password"
        type="password"
        value={credentials.password}
        onChange={handleChange}
      />
      <div className="h-2" />
      <Button
        type="submit"
        label="Se connecter"
        centered
      />
    </form>
  );
}