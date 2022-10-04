import { ReactNode, useEffect, useState } from "react";

import keycloak from "../keycloak";

async function initKeycloak() {
  return await keycloak
    .init({})
    .then(function (authenticated) {
      return authenticated;
    })
    .catch(function () {
      console.log("failed to initialize");
    });
}

const ReactKeycloakWrapper = ({ children }: { children: ReactNode }) => {
  const [authenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    const init = async () => {
      const authenticated = await initKeycloak();
      if (typeof authenticated !== "undefined") {
        setAuthenticated(authenticated);
      }
    };
    init();
  }, []);
  return (
    <div>
      {authenticated ? (
        <div>
          <div>{`Logout ${keycloak.token} ${keycloak.subject}`}</div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              keycloak.logout();
            }}
          >{`Logout`}</button>
        </div>
      ) : (
        <>
          <div>{`Authenticated ${authenticated} ${keycloak.authenticated}`}</div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              keycloak.login();
            }}
          >{`Login`}</button>
          {children}
        </>
      )}
    </div>
  );
};

export default ReactKeycloakWrapper;
