import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const login = useAuthStore(state => state.login);

  const handleLogin = () => {
    // Mock login for demonstration
    login(
      {
        id: '1',
        email: 'demo@example.com',
        name: 'Demo User'
      },
      'mock-token'
    );
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <Button onClick={handleLogin} className="w-full">
          Demo Login
        </Button>
      </Card>
    </div>
  );
};

export default Login;