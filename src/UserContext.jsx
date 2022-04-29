import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TOKEN_POST, TOKEN_GET, TOKEN_VALIDATE_POST } from './api';

export const UserContext = React.createContext();

export function UserStorage({ children }) {
  const [userData, setUserData] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  const getUser = React.useCallback(async (token) => {
    try {
      setLoading(true);
      const { url, options } = TOKEN_GET(token);
      const response = await fetch(url, options);
      if (!response.ok) throw Error('Error: Invalid User');
      const json = await response.json();
      setUserData(json);
      setLogin(true);
      navigate('/account');
    } catch (err) {
      setError(err.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  async function userLogin(username, password) {
    const { url, options } = TOKEN_POST({ username, password });
    const response = await fetch(url, options);
    const { token } = await response.json();
    window.localStorage.setItem('token', token);
    getUser(token);
  }

  const userLogout = React.useCallback(async () => {
    setUserData(null);
    setError(null);
    setLoading(false);
    setLogin(false);
    window.localStorage.removeItem('token');
    navigate('/user');
  }, [navigate]);

  React.useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem('token');
      if (token) {
        try {
          setError(null);
          setLoading(true);
          const { url, options } = TOKEN_VALIDATE_POST(token);
          const response = await fetch(url, options);
          if (!response.ok) throw Error('Error: Invalid token');
          await getUser(token);
        } catch (err) {
          await userLogout();
        } finally {
          setLoading(false);
        }
      }
    }

    autoLogin();
  }, [userLogout, getUser]);

  return (
    <UserContext.Provider
      value={{
        userLogin,
        userData,
        userLogout,
        error,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
