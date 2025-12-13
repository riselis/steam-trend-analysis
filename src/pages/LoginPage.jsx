import { Link } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import './LoginPage.css';

function LoginPage() {
  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Login</h1>
        <LoginForm />
        <p className="register-link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;

