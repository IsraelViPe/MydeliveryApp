import LoginForm from '../../components/LoginForm';
import styleLogin from './Login.module.css';

export default function Login() {
  return (
    <div className={ styleLogin.bodyPage }>
      <LoginForm />
    </div>
  );
}
