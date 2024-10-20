import React, {
    createContext,
    useState,
    useContext,
    PropsWithChildren,
  } from 'react';

  const useAppContextValue = () => {
    let defaultSessionStatus = false;
    // if (typeof localStorage !== 'undefined') {
    //   defaultSessionStatus = localStorage.getItem('isSessionValid') === '1' ? true : false;
    // }

    const [userData, setUserData] = useState<any>({});
    const [isSessionValid, setIsSessionValid] = useState<boolean>(defaultSessionStatus);

    const setterIsSessionValid = (isSessionValid: boolean) => {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('isSessionValid', isSessionValid ? '1' : '0');
      }
      setIsSessionValid(isSessionValid)
    }

    return {
        userData,
        isSessionValid,
        setUserData,
        setIsSessionValid: setterIsSessionValid,
    };
  };

  export type AppContextValue = ReturnType<
    typeof useAppContextValue
  >;

  const AppContext = createContext(
    {} as AppContextValue
  );

  export const useAppContext = () =>
    useContext(AppContext);

  export const AppContextProvider: React.FC<PropsWithChildren> =
    ({children}) => {
      const value = useAppContextValue();
      return (
        <AppContext.Provider value={value}>
          {children}
        </AppContext.Provider>
      );
    };
