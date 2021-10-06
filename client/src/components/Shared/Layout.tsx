import React, { useEffect, useState, createContext } from 'react';
import { action, Route } from '../../utils';
import * as Types from '../../__generated__';
import { Link } from 'react-router-dom';

export const AuthContext = createContext<{
  user?: Types.User;
  error?: any;
  loading?: boolean;
}>({});

export const Layout: React.FC = (props) => {
  const [user, setUser] = useState<Types.User>();

  const [error, setError] = useState<string>();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const getData = async () => {
      await action(
        { method: 'GET', path: '/me' },
        (res) => {
          setLoading(false);

          if (mounted && res) {
            setUser({ _id: res.data._id, username: res.data.username });
          }
        },
        (e) => {
          setLoading(false);
          setError(e.message);
          setUser(undefined);
        }
      );
    };

    getData();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return <span>Loading ...</span>;
  }

  return (
    <AuthContext.Provider value={{ user, error, loading }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const AuthLayout: React.FC = (props) => {
  return (
    <Layout>
      <AuthContext.Consumer>
        {(ctx) => {
          if (ctx.user && !ctx.loading) {
            return <>{props.children}</>;
          } else {
            return <Link to={Route.Home}>You must login first</Link>;
          }
        }}
      </AuthContext.Consumer>
    </Layout>
  );
};

export const UnAuthLayout: React.FC = (props) => {
  return (
    <Layout>
      <AuthContext.Consumer>
        {(ctx) => {
          if (ctx.user && !ctx.loading) {
            return (
              <>
                <Link to={Route.Message}>go to your dashboard</Link>
              </>
            );
          } else {
            return <>{props.children}</>;
          }
        }}
      </AuthContext.Consumer>
    </Layout>
  );
};
