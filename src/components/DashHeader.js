import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSendLogoutMutation } from '../featurs/auth/authApiSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFileCirclePlus,
  faFilePen,
  faRightFromBracket,
  faUserGear,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import useAuth from '../hooks/useAuth';
import { PulseLoader } from 'react-spinners';

const DASH_REGEX = /^\/dash(\/)?$/;
const NOTES_REGEX = /^\/dash\/notes(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;

const DashHeader = () => {
  const { isManager, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  useEffect(() => {
    if (isSuccess) navigate('/');
  }, [isSuccess, navigate]);

  if (isLoading) return <PulseLoader color={'#fff'} />;

  if (isError) return <p>Error: {error?.data?.message}</p>;

  let dashClass = null;
  if (
    !DASH_REGEX.test(pathname) &&
    !USERS_REGEX.test(pathname) &&
    !NOTES_REGEX.test(pathname)
  ) {
    dashClass = 'dash-header__container--small';
  }

  let newNoteButton = null;
  if (NOTES_REGEX.test(pathname)) {
    newNoteButton = (
      <button
        className="icon-button"
        title="New Note"
        onClick={() => navigate('/dash/notes/new')}
      >
        <FontAwesomeIcon icon={faFileCirclePlus} />
      </button>
    );
  }
  // console.log(NOTES_REGEX.test(pathname));

  let newUserButton = null;
  if (USERS_REGEX.test(pathname)) {
    newUserButton = (
      <button
        className="icon-button"
        title="New User"
        onClick={() => navigate('/dash/users/new')}
      >
        <FontAwesomeIcon icon={faUserPlus} />
      </button>
    );
  }

  let userButton = null;
  if (isAdmin || isManager) {
    if (!USERS_REGEX.test(pathname) && pathname.includes('/dash')) {
      userButton = (
        <button
          className="icon-button"
          title="Users"
          onClick={() => navigate('/dash/users')}
        >
          <FontAwesomeIcon icon={faUserGear} />
        </button>
      );
    }
  }

  let notesButton = null;
  if (!NOTES_REGEX.test(pathname) && pathname.includes('/dash')) {
    notesButton = (
      <button
        className="icon-button"
        title="Notes"
        onClick={() => navigate('/dash/notes')}
      >
        <FontAwesomeIcon icon={faFilePen} />
      </button>
    );
  }

  const logoutButton = (
    <button className="icon-button" title="Logout" onClick={() => sendLogout()}>
      <FontAwesomeIcon icon={faRightFromBracket} />
    </button>
  );

  const errClass = isError ? 'errmsg' : 'offscreen';

  let buttonContent;
  if (isLoading) {
    buttonContent = <p>Login Out...</p>;
  } else {
    buttonContent = (
      <>
        {newNoteButton}
        {newUserButton}
        {userButton}
        {notesButton}
        {logoutButton}
      </>
    );
  }
  const content = (
    <>
      <p className={errClass}>{error?.data?.message}</p>
      <header className="dash-header">
        <div className={`dash-header__container ${dashClass}`}>
          <Link to="/dash">
            <h1 className="dash-header__title">techNotes</h1>
          </Link>
          <nav className="dash-header__nav">{buttonContent}</nav>
        </div>
      </header>
    </>
  );

  return content;
};

export default DashHeader;
