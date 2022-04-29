import React from 'react';
import { Link } from 'react-router-dom';
import Input from '../Form/Input';
import Button from '../Form/Button';
import useInput from '../../Hooks/useInput';
import Error from '../Common/Error';
import { UserContext } from '../../UserContext';
import Classes from './Login.module.scss';

function Login() {
  const username = useInput();
  const password = useInput();

  const { userLogin, error, loading } = React.useContext(UserContext);

  async function handleSubmit(event) {
    event.preventDefault();

    if (username.validate() && password.validate()) {
      userLogin(username.value, password.value);
    }
  }

  return (
    <div className="introAnimationLeft">
      <h1 className={Classes.title}>Login</h1>

      <form action="" onSubmit={handleSubmit}>
        <Input
          label="Username"
          type="text"
          name="username"
          {...username}
        />

        <Input
          label="Password"
          type="password"
          name="password"
          {...password}
        />

        <Error error={error} />

        {loading ? (
          <Button disabled>Loading...</Button>
        ) : (
          <Button>Log in</Button>
        )}
      </form>

      <Link className={Classes.forgotPassoword} to="lostpassword">
        Forgot your password?
      </Link>

      <div>
        <h2>Sign up</h2>
        <p>You already have an account?</p>
        <Link to="signup">Create account</Link>
      </div>

    </div>
  );
}

export default Login;
