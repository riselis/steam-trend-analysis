import { Link } from 'react-router-dom';
import RegisterForm from '../components/auth/RegisterForm';
import './RegisterPage.css';

function RegisterPage() {
  return (
    <div className="register-page">
      <div className="register-container">
        <h1>Register</h1>
        <RegisterForm />
        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;

