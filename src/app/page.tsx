'use client';

import { AppContextProvider, useAppContext } from "./context/AppContext";
import Auth from "./auth/page";
import Products from "./products";
import { NavigationContextProvider } from "./context/NavigationContext";

export default function Home() {
  return (
    <AppContextProvider>
      <AuthComponent />
    </AppContextProvider>
  );
}

function AuthComponent() {
  const {isSessionValid} = useAppContext();

  return <>
    <NavigationContextProvider>
      {isSessionValid ? <Products /> : <Auth />}
    </NavigationContextProvider>
  </>
}
