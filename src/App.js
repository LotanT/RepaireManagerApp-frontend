import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Public from './components/Public';
import Login from './featurs/auth/Login';
import DashLayout from './components/DashLayout';
import Welcome from './featurs/auth/Welcome';
import NotesList from './featurs/notes/NotesList';
import UsersList from './featurs/users/UsersList';
import EditUser from './featurs/users/EditUser';
import NewUserForm from './featurs/users/NewUserForm';
import NewNote from './featurs/notes/NewNote';
import EditNote from './featurs/notes/EditNote';
import Prefetch from './featurs/auth/Prefetch';
import PersistLogin from './featurs/auth/PersistLogin';
import RequireAuth from './featurs/auth/RequireAuth';
import { ROLES } from './config/roles';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="/login" element={<Login />} />

        <Route element={<PersistLogin />}>
          <Route
            element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
          >
            <Route element={<Prefetch />}>
              <Route path="dash" element={<DashLayout />}>
                <Route index element={<Welcome />} />

                <Route
                  element={
                    <RequireAuth allowedRoles={[ROLES.Admin, ROLES.Manager]} />
                  }
                >
                  <Route path="users">
                    <Route index element={<UsersList />} />
                    <Route path=":id" element={<EditUser />} />
                    <Route path="new" element={<NewUserForm />} />
                  </Route>
                </Route>

                <Route path="notes">
                  <Route index element={<NotesList />} />
                  <Route path=":id" element={<EditNote />} />
                  <Route path="new" element={<NewNote />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
