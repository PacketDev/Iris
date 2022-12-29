import { Navigate } from 'react-router-dom';

export const PrivateRoute = (children: any): JSX.Element => {
  return (
    <>
      {localStorage.getItem('iris-app') ? children : <Navigate to="/login" />}
    </>
  );
};
