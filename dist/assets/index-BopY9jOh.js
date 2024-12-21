import { importShared } from "./__federation_fn_import-Ca_-J8Zi.js";
import { j as jsxRuntimeExports } from "./jsx-runtime-BcIfvQoK.js";
import { r as reactDomExports } from "./__federation_shared_react-dom-C5DmKIcz.js";
import appConfig from "./__federation_expose_Config-B1YR1UT0.js";
var client = {};
var m = reactDomExports;
{
  client.createRoot = m.createRoot;
  client.hydrateRoot = m.hydrateRoot;
}
const { FireCMSCloudApp } = await importShared("@firecms/cloud");
function App() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(FireCMSCloudApp, { projectId: "mecms-firecms", appConfig });
}
const React = await importShared("react");
client.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(React.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) })
);
