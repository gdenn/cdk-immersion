import config from "../../env.json";

export const getURL = (path: string) => `http://${config.backendEndpointURL}:${config.backendEndpointPort}${path}`;
