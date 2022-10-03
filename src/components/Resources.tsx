import { useState, useEffect } from "react";
import Keycloak from "keycloak-js";
import ReactKeycloakWrapper from "./ReactKeycloakWrapper";

export default function Resources() {
  return (
    <div>
      <ReactKeycloakWrapper>
        <div className="my-12">Keycloak initializing in a moment...</div>
      </ReactKeycloakWrapper>
    </div>
  );
}
