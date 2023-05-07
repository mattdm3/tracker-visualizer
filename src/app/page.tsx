'use client';
import Login from './login';

// do not cache this page
export const revalidate = 0;

export default function App() {
  return (
    <>
      <Login />
    </>
  );
}
