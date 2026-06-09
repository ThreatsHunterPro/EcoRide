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
      const roleId = Number(userData.user.role_id); 

      if (roleId === 1) {
        navigate('/admin/dashboard');
      } else if (roleId === 2) {
        navigate('/moderation/dashboard');
      } else {
        navigate('/', { replace: true });
      }
    } catch (err) {
      setError("Une erreur est survenue");
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