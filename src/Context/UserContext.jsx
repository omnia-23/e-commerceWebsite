import { createContext, useState } from "react";

export let UserContext = createContext();

export default function UserProvider(props) {
  const [role, setRole] = useState(null);
  const [token, setToken] = useState(null);

  return (
    <UserContext.Provider value={{ role, setRole, token, setToken }}>
      {props.children}
    </UserContext.Provider>
  );
}
