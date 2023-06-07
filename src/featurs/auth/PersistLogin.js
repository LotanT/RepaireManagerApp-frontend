import React, { useEffect, useRef, useState } from 'react';
import usePersist from '../../hooks/usePersist';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from './AuthSlice';
import { useRefreshMutation } from './authApiSlice';
import { Link, Outlet } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';

const PersistLogin = () => {
  const [persist] = usePersist();
  const token = useSelector(selectCurrentToken);
  const effectRan = useRef(false);

  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isUninitialized, isLoading, isError, isSuccess, error }] =
    useRefreshMutation();

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
      const verifyToken = async () => {
        console.log('Verifying refresh token');
        try {
          await refresh();
          setTrueSuccess(true);
        } catch (err) {
          console.log(err);
        }
      };

      if (!token && persist) verifyToken();
    }

    return () => (effectRan.current = true);

    // eslint-disable-next-line
  }, []);

  let content;
  if (!persist) {
    console.log('no persist');
    content = <Outlet />;
  } else if (isLoading) {
    console.log('loading');
    content = <PulseLoader color={'#fff'} />;
  } else if (isError) {
    console.log(error);
    content = (
      <p className="errmsg">
        {`${error?.data?.message} - `}
        <Link to="/login">Please login again</Link>
      </p>
    );
  } else if (isSuccess && trueSuccess) {
    console.log('success');
    content = <Outlet />;
  } else if (token && isUninitialized) {
    console.log('token and isUnitialized');
    console.log(isUninitialized);
    content = <Outlet />;
  }
  return content;
};

export default PersistLogin;
