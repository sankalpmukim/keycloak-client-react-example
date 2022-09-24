import { useState, useEffect } from "react";
import Keycloak from "keycloak-js";

export default function Resources() {
  const [keycloak, setKeycloak] = useState<Keycloak | null>(null);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const keycloak = Keycloak("/keycloak.json");
    keycloak.init({ onLoad: "login-required" }).then((authenticated) => {
      setKeycloak(keycloak);
      setAuthenticated(authenticated);
    });
  }, []);

  if (keycloak) {
    if (authenticated)
      return (
        <>
          {/* JSX returns an image and text as protected **resources** */}
          <div className="my-12 grid place-items-center">
            <p> You are logged in.</p>
            <div>
              <img src="https://random.imagecdn.app/500/250" />
            </div>
          </div>
        </>
      );
    else return <div className="my-12">Unable to initiate auth!</div>;
  }

  return (
    <>
      <div className="my-12">Keycloak initializing in a moment...</div>
    </>
  );
}
