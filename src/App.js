import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Public from './components/Public';
import Login from './featurs/auth/Login';
import DashLayout from './components/DashLayout';
import Welcome from './featurs/auth/Welcome';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="/login" element={<Login />} />

        <Route path="dash" element={<DashLayout />}>
          <Route index element={<Welcome />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
