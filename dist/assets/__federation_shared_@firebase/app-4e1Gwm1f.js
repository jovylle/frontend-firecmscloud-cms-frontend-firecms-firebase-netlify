import { A as getDefaultAppConfig, e as deepEqual, B as isBrowser, G as isWebWorker, C as Component, E as ErrorFactory, H as ComponentContainer, I as base64urlEncodeWithoutPadding, t as isIndexedDBAvailable, v as validateIndexedDBOpenable, F as FirebaseError } from "../index.esm2017-VG2SW2cC.js";
import { L as Logger, s as setUserLogHandler, b as setLogLevel$1 } from "../index.esm2017-BVSbM8hR.js";
import { o as openDB } from "../index-q6KbMjk0.js";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class PlatformLoggerServiceImpl {
  constructor(container) {
    this.container = container;
  }
  // In initial implementation, this will be called by installations on
  // auth token refresh, and installations will send this string.
  getPlatformInfoString() {
    const providers = this.container.getProviders();
    return providers.map((provider) => {
      if (isVersionServiceProvider(provider)) {
        const service = provider.getImmediate();
        return `${service.library}/${service.version}`;
      } else {
        return null;
      }
    }).filter((logString) => logString).join(" ");
  }
}
function isVersionServiceProvider(provider) {
  const component = provider.getComponent();
  return (component === null || component === void 0 ? void 0 : component.type) === "VERSION";
}
const name$q = "@firebase/app";
const version$1 = "0.10.13";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const logger = new Logger("@firebase/app");
const name$p = "@firebase/app-compat";
const name$o = "@firebase/analytics-compat";
const name$n = "@firebase/analytics";
const name$m = "@firebase/app-check-compat";
const name$l = "@firebase/app-check";
const name$k = "@firebase/auth";
const name$j = "@firebase/auth-compat";
const name$i = "@firebase/database";
const name$h = "@firebase/data-connect";
const name$g = "@firebase/database-compat";
const name$f = "@firebase/functions";
const name$e = "@firebase/functions-compat";
const name$d = "@firebase/installations";
const name$c = "@firebase/installations-compat";
const name$b = "@firebase/messaging";
const name$a = "@firebase/messaging-compat";
const name$9 = "@firebase/performance";
const name$8 = "@firebase/performance-compat";
const name$7 = "@firebase/remote-config";
const name$6 = "@firebase/remote-config-compat";
const name$5 = "@firebase/storage";
const name$4 = "@firebase/storage-compat";
const name$3 = "@firebase/firestore";
const name$2 = "@firebase/vertexai-preview";
const name$1 = "@firebase/firestore-compat";
const name = "firebase";
const version = "10.14.1";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const DEFAULT_ENTRY_NAME = "[DEFAULT]";
const PLATFORM_LOG_STRING = {
  [name$q]: "fire-core",
  [name$p]: "fire-core-compat",
  [name$n]: "fire-analytics",
  [name$o]: "fire-analytics-compat",
  [name$l]: "fire-app-check",
  [name$m]: "fire-app-check-compat",
  [name$k]: "fire-auth",
  [name$j]: "fire-auth-compat",
  [name$i]: "fire-rtdb",
  [name$h]: "fire-data-connect",
  [name$g]: "fire-rtdb-compat",
  [name$f]: "fire-fn",
  [name$e]: "fire-fn-compat",
  [name$d]: "fire-iid",
  [name$c]: "fire-iid-compat",
  [name$b]: "fire-fcm",
  [name$a]: "fire-fcm-compat",
  [name$9]: "fire-perf",
  [name$8]: "fire-perf-compat",
  [name$7]: "fire-rc",
  [name$6]: "fire-rc-compat",
  [name$5]: "fire-gcs",
  [name$4]: "fire-gcs-compat",
  [name$3]: "fire-fst",
  [name$1]: "fire-fst-compat",
  [name$2]: "fire-vertex",
  "fire-js": "fire-js",
  [name]: "fire-js-all"
};
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const _apps = /* @__PURE__ */ new Map();
const _serverApps = /* @__PURE__ */ new Map();
const _components = /* @__PURE__ */ new Map();
function _addComponent(app, component) {
  try {
    app.container.addComponent(component);
  } catch (e) {
    logger.debug(`Component ${component.name} failed to register with FirebaseApp ${app.name}`, e);
  }
}
function _addOrOverwriteComponent(app, component) {
  app.container.addOrOverwriteComponent(component);
}
function _registerComponent(component) {
  const componentName = component.name;
  if (_components.has(componentName)) {
    logger.debug(`There were multiple attempts to register component ${componentName}.`);
    return false;
  }
  _components.set(componentName, component);
  for (const app of _apps.values()) {
    _addComponent(app, component);
  }
  for (const serverApp of _serverApps.values()) {
    _addComponent(serverApp, component);
  }
  return true;
}
function _getProvider(app, name2) {
  const heartbeatController = app.container.getProvider("heartbeat").getImmediate({ optional: true });
  if (heartbeatController) {
    void heartbeatController.triggerHeartbeat();
  }
  return app.container.getProvider(name2);
}
function _removeServiceInstance(app, name2, instanceIdentifier = DEFAULT_ENTRY_NAME) {
  _getProvider(app, name2).clearInstance(instanceIdentifier);
}
function _isFirebaseApp(obj) {
  return obj.options !== void 0;
}
function _isFirebaseServerApp(obj) {
  return obj.settings !== void 0;
}
function _clearComponents() {
  _components.clear();
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const ERRORS = {
  [
    "no-app"
    /* AppError.NO_APP */
  ]: "No Firebase App '{$appName}' has been created - call initializeApp() first",
  [
    "bad-app-name"
    /* AppError.BAD_APP_NAME */
  ]: "Illegal App name: '{$appName}'",
  [
    "duplicate-app"
    /* AppError.DUPLICATE_APP */
  ]: "Firebase App named '{$appName}' already exists with different options or config",
  [
    "app-deleted"
    /* AppError.APP_DELETED */
  ]: "Firebase App named '{$appName}' already deleted",
  [
    "server-app-deleted"
    /* AppError.SERVER_APP_DELETED */
  ]: "Firebase Server App has been deleted",
  [
    "no-options"
    /* AppError.NO_OPTIONS */
  ]: "Need to provide options, when not being deployed to hosting via source.",
  [
    "invalid-app-argument"
    /* AppError.INVALID_APP_ARGUMENT */
  ]: "firebase.{$appName}() takes either no argument or a Firebase App instance.",
  [
    "invalid-log-argument"
    /* AppError.INVALID_LOG_ARGUMENT */
  ]: "First argument to `onLog` must be null or a function.",
  [
    "idb-open"
    /* AppError.IDB_OPEN */
  ]: "Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.",
  [
    "idb-get"
    /* AppError.IDB_GET */
  ]: "Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.",
  [
    "idb-set"
    /* AppError.IDB_WRITE */
  ]: "Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.",
  [
    "idb-delete"
    /* AppError.IDB_DELETE */
  ]: "Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.",
  [
    "finalization-registry-not-supported"
    /* AppError.FINALIZATION_REGISTRY_NOT_SUPPORTED */
  ]: "FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.",
  [
    "invalid-server-app-environment"
    /* AppError.INVALID_SERVER_APP_ENVIRONMENT */
  ]: "FirebaseServerApp is not for use in browser environments."
};
const ERROR_FACTORY = new ErrorFactory("app", "Firebase", ERRORS);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class FirebaseAppImpl {
  constructor(options, config, container) {
    this._isDeleted = false;
    this._options = Object.assign({}, options);
    this._config = Object.assign({}, config);
    this._name = config.name;
    this._automaticDataCollectionEnabled = config.automaticDataCollectionEnabled;
    this._container = container;
    this.container.addComponent(new Component(
      "app",
      () => this,
      "PUBLIC"
      /* ComponentType.PUBLIC */
    ));
  }
  get automaticDataCollectionEnabled() {
    this.checkDestroyed();
    return this._automaticDataCollectionEnabled;
  }
  set automaticDataCollectionEnabled(val) {
    this.checkDestroyed();
    this._automaticDataCollectionEnabled = val;
  }
  get name() {
    this.checkDestroyed();
    return this._name;
  }
  get options() {
    this.checkDestroyed();
    return this._options;
  }
  get config() {
    this.checkDestroyed();
    return this._config;
  }
  get container() {
    return this._container;
  }
  get isDeleted() {
    return this._isDeleted;
  }
  set isDeleted(val) {
    this._isDeleted = val;
  }
  /**
   * This function will throw an Error if the App has already been deleted -
   * use before performing API actions on the App.
   */
  checkDestroyed() {
    if (this.isDeleted) {
      throw ERROR_FACTORY.create("app-deleted", { appName: this._name });
    }
  }
}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class FirebaseServerAppImpl extends FirebaseAppImpl {
  constructor(options, serverConfig, name2, container) {
    const automaticDataCollectionEnabled = serverConfig.automaticDataCollectionEnabled !== void 0 ? serverConfig.automaticDataCollectionEnabled : false;
    const config = {
      name: name2,
      automaticDataCollectionEnabled
    };
    if (options.apiKey !== void 0) {
      super(options, config, container);
    } else {
      const appImpl = options;
      super(appImpl.options, config, container);
    }
    this._serverConfig = Object.assign({ automaticDataCollectionEnabled }, serverConfig);
    this._finalizationRegistry = null;
    if (typeof FinalizationRegistry !== "undefined") {
      this._finalizationRegistry = new FinalizationRegistry(() => {
        this.automaticCleanup();
      });
    }
    this._refCount = 0;
    this.incRefCount(this._serverConfig.releaseOnDeref);
    this._serverConfig.releaseOnDeref = void 0;
    serverConfig.releaseOnDeref = void 0;
    registerVersion(name$q, version$1, "serverapp");
  }
  toJSON() {
    return void 0;
  }
  get refCount() {
    return this._refCount;
  }
  // Increment the reference count of this server app. If an object is provided, register it
  // with the finalization registry.
  incRefCount(obj) {
    if (this.isDeleted) {
      return;
    }
    this._refCount++;
    if (obj !== void 0 && this._finalizationRegistry !== null) {
      this._finalizationRegistry.register(obj, this);
    }
  }
  // Decrement the reference count.
  decRefCount() {
    if (this.isDeleted) {
      return 0;
    }
    return --this._refCount;
  }
  // Invoked by the FinalizationRegistry callback to note that this app should go through its
  // reference counts and delete itself if no reference count remain. The coordinating logic that
  // handles this is in deleteApp(...).
  automaticCleanup() {
    void deleteApp(this);
  }
  get settings() {
    this.checkDestroyed();
    return this._serverConfig;
  }
  /**
   * This function will throw an Error if the App has already been deleted -
   * use before performing API actions on the App.
   */
  checkDestroyed() {
    if (this.isDeleted) {
      throw ERROR_FACTORY.create(
        "server-app-deleted"
        /* AppError.SERVER_APP_DELETED */
      );
    }
  }
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const SDK_VERSION = version;
function initializeApp(_options, rawConfig = {}) {
  let options = _options;
  if (typeof rawConfig !== "object") {
    const name3 = rawConfig;
    rawConfig = { name: name3 };
  }
  const config = Object.assign({ name: DEFAULT_ENTRY_NAME, automaticDataCollectionEnabled: false }, rawConfig);
  const name2 = config.name;
  if (typeof name2 !== "string" || !name2) {
    throw ERROR_FACTORY.create("bad-app-name", {
      appName: String(name2)
    });
  }
  options || (options = getDefaultAppConfig());
  if (!options) {
    throw ERROR_FACTORY.create(
      "no-options"
      /* AppError.NO_OPTIONS */
    );
  }
  const existingApp = _apps.get(name2);
  if (existingApp) {
    if (deepEqual(options, existingApp.options) && deepEqual(config, existingApp.config)) {
      return existingApp;
    } else {
      throw ERROR_FACTORY.create("duplicate-app", { appName: name2 });
    }
  }
  const container = new ComponentContainer(name2);
  for (const component of _components.values()) {
    container.addComponent(component);
  }
  const newApp = new FirebaseAppImpl(options, config, container);
  _apps.set(name2, newApp);
  return newApp;
}
function initializeServerApp(_options, _serverAppConfig) {
  if (isBrowser() && !isWebWorker()) {
    throw ERROR_FACTORY.create(
      "invalid-server-app-environment"
      /* AppError.INVALID_SERVER_APP_ENVIRONMENT */
    );
  }
  if (_serverAppConfig.automaticDataCollectionEnabled === void 0) {
    _serverAppConfig.automaticDataCollectionEnabled = false;
  }
  let appOptions;
  if (_isFirebaseApp(_options)) {
    appOptions = _options.options;
  } else {
    appOptions = _options;
  }
  const nameObj = Object.assign(Object.assign({}, _serverAppConfig), appOptions);
  if (nameObj.releaseOnDeref !== void 0) {
    delete nameObj.releaseOnDeref;
  }
  const hashCode = (s) => {
    return [...s].reduce((hash, c) => Math.imul(31, hash) + c.charCodeAt(0) | 0, 0);
  };
  if (_serverAppConfig.releaseOnDeref !== void 0) {
    if (typeof FinalizationRegistry === "undefined") {
      throw ERROR_FACTORY.create("finalization-registry-not-supported", {});
    }
  }
  const nameString = "" + hashCode(JSON.stringify(nameObj));
  const existingApp = _serverApps.get(nameString);
  if (existingApp) {
    existingApp.incRefCount(_serverAppConfig.releaseOnDeref);
    return existingApp;
  }
  const container = new ComponentContainer(nameString);
  for (const component of _components.values()) {
    container.addComponent(component);
  }
  const newApp = new FirebaseServerAppImpl(appOptions, _serverAppConfig, nameString, container);
  _serverApps.set(nameString, newApp);
  return newApp;
}
function getApp(name2 = DEFAULT_ENTRY_NAME) {
  const app = _apps.get(name2);
  if (!app && name2 === DEFAULT_ENTRY_NAME && getDefaultAppConfig()) {
    return initializeApp();
  }
  if (!app) {
    throw ERROR_FACTORY.create("no-app", { appName: name2 });
  }
  return app;
}
function getApps() {
  return Array.from(_apps.values());
}
async function deleteApp(app) {
  let cleanupProviders = false;
  const name2 = app.name;
  if (_apps.has(name2)) {
    cleanupProviders = true;
    _apps.delete(name2);
  } else if (_serverApps.has(name2)) {
    const firebaseServerApp = app;
    if (firebaseServerApp.decRefCount() <= 0) {
      _serverApps.delete(name2);
      cleanupProviders = true;
    }
  }
  if (cleanupProviders) {
    await Promise.all(app.container.getProviders().map((provider) => provider.delete()));
    app.isDeleted = true;
  }
}
function registerVersion(libraryKeyOrName, version2, variant) {
  var _a;
  let library = (_a = PLATFORM_LOG_STRING[libraryKeyOrName]) !== null && _a !== void 0 ? _a : libraryKeyOrName;
  if (variant) {
    library += `-${variant}`;
  }
  const libraryMismatch = library.match(/\s|\//);
  const versionMismatch = version2.match(/\s|\//);
  if (libraryMismatch || versionMismatch) {
    const warning = [
      `Unable to register library "${library}" with version "${version2}":`
    ];
    if (libraryMismatch) {
      warning.push(`library name "${library}" contains illegal characters (whitespace or "/")`);
    }
    if (libraryMismatch && versionMismatch) {
      warning.push("and");
    }
    if (versionMismatch) {
      warning.push(`version name "${version2}" contains illegal characters (whitespace or "/")`);
    }
    logger.warn(warning.join(" "));
    return;
  }
  _registerComponent(new Component(
    `${library}-version`,
    () => ({ library, version: version2 }),
    "VERSION"
    /* ComponentType.VERSION */
  ));
}
function onLog(logCallback, options) {
  if (logCallback !== null && typeof logCallback !== "function") {
    throw ERROR_FACTORY.create(
      "invalid-log-argument"
      /* AppError.INVALID_LOG_ARGUMENT */
    );
  }
  setUserLogHandler(logCallback, options);
}
function setLogLevel(logLevel) {
  setLogLevel$1(logLevel);
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const DB_NAME = "firebase-heartbeat-database";
const DB_VERSION = 1;
const STORE_NAME = "firebase-heartbeat-store";
let dbPromise = null;
function getDbPromise() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade: (db, oldVersion) => {
        switch (oldVersion) {
          case 0:
            try {
              db.createObjectStore(STORE_NAME);
            } catch (e) {
              console.warn(e);
            }
        }
      }
    }).catch((e) => {
      throw ERROR_FACTORY.create("idb-open", {
        originalErrorMessage: e.message
      });
    });
  }
  return dbPromise;
}
async function readHeartbeatsFromIndexedDB(app) {
  try {
    const db = await getDbPromise();
    const tx = db.transaction(STORE_NAME);
    const result = await tx.objectStore(STORE_NAME).get(computeKey(app));
    await tx.done;
    return result;
  } catch (e) {
    if (e instanceof FirebaseError) {
      logger.warn(e.message);
    } else {
      const idbGetError = ERROR_FACTORY.create("idb-get", {
        originalErrorMessage: e === null || e === void 0 ? void 0 : e.message
      });
      logger.warn(idbGetError.message);
    }
  }
}
async function writeHeartbeatsToIndexedDB(app, heartbeatObject) {
  try {
    const db = await getDbPromise();
    const tx = db.transaction(STORE_NAME, "readwrite");
    const objectStore = tx.objectStore(STORE_NAME);
    await objectStore.put(heartbeatObject, computeKey(app));
    await tx.done;
  } catch (e) {
    if (e instanceof FirebaseError) {
      logger.warn(e.message);
    } else {
      const idbGetError = ERROR_FACTORY.create("idb-set", {
        originalErrorMessage: e === null || e === void 0 ? void 0 : e.message
      });
      logger.warn(idbGetError.message);
    }
  }
}
function computeKey(app) {
  return `${app.name}!${app.options.appId}`;
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const MAX_HEADER_BYTES = 1024;
const STORED_HEARTBEAT_RETENTION_MAX_MILLIS = 30 * 24 * 60 * 60 * 1e3;
class HeartbeatServiceImpl {
  constructor(container) {
    this.container = container;
    this._heartbeatsCache = null;
    const app = this.container.getProvider("app").getImmediate();
    this._storage = new HeartbeatStorageImpl(app);
    this._heartbeatsCachePromise = this._storage.read().then((result) => {
      this._heartbeatsCache = result;
      return result;
    });
  }
  /**
   * Called to report a heartbeat. The function will generate
   * a HeartbeatsByUserAgent object, update heartbeatsCache, and persist it
   * to IndexedDB.
   * Note that we only store one heartbeat per day. So if a heartbeat for today is
   * already logged, subsequent calls to this function in the same day will be ignored.
   */
  async triggerHeartbeat() {
    var _a, _b;
    try {
      const platformLogger = this.container.getProvider("platform-logger").getImmediate();
      const agent = platformLogger.getPlatformInfoString();
      const date = getUTCDateString();
      if (((_a = this._heartbeatsCache) === null || _a === void 0 ? void 0 : _a.heartbeats) == null) {
        this._heartbeatsCache = await this._heartbeatsCachePromise;
        if (((_b = this._heartbeatsCache) === null || _b === void 0 ? void 0 : _b.heartbeats) == null) {
          return;
        }
      }
      if (this._heartbeatsCache.lastSentHeartbeatDate === date || this._heartbeatsCache.heartbeats.some((singleDateHeartbeat) => singleDateHeartbeat.date === date)) {
        return;
      } else {
        this._heartbeatsCache.heartbeats.push({ date, agent });
      }
      this._heartbeatsCache.heartbeats = this._heartbeatsCache.heartbeats.filter((singleDateHeartbeat) => {
        const hbTimestamp = new Date(singleDateHeartbeat.date).valueOf();
        const now = Date.now();
        return now - hbTimestamp <= STORED_HEARTBEAT_RETENTION_MAX_MILLIS;
      });
      return this._storage.overwrite(this._heartbeatsCache);
    } catch (e) {
      logger.warn(e);
    }
  }
  /**
   * Returns a base64 encoded string which can be attached to the heartbeat-specific header directly.
   * It also clears all heartbeats from memory as well as in IndexedDB.
   *
   * NOTE: Consuming product SDKs should not send the header if this method
   * returns an empty string.
   */
  async getHeartbeatsHeader() {
    var _a;
    try {
      if (this._heartbeatsCache === null) {
        await this._heartbeatsCachePromise;
      }
      if (((_a = this._heartbeatsCache) === null || _a === void 0 ? void 0 : _a.heartbeats) == null || this._heartbeatsCache.heartbeats.length === 0) {
        return "";
      }
      const date = getUTCDateString();
      const { heartbeatsToSend, unsentEntries } = extractHeartbeatsForHeader(this._heartbeatsCache.heartbeats);
      const headerString = base64urlEncodeWithoutPadding(JSON.stringify({ version: 2, heartbeats: heartbeatsToSend }));
      this._heartbeatsCache.lastSentHeartbeatDate = date;
      if (unsentEntries.length > 0) {
        this._heartbeatsCache.heartbeats = unsentEntries;
        await this._storage.overwrite(this._heartbeatsCache);
      } else {
        this._heartbeatsCache.heartbeats = [];
        void this._storage.overwrite(this._heartbeatsCache);
      }
      return headerString;
    } catch (e) {
      logger.warn(e);
      return "";
    }
  }
}
function getUTCDateString() {
  const today = /* @__PURE__ */ new Date();
  return today.toISOString().substring(0, 10);
}
function extractHeartbeatsForHeader(heartbeatsCache, maxSize = MAX_HEADER_BYTES) {
  const heartbeatsToSend = [];
  let unsentEntries = heartbeatsCache.slice();
  for (const singleDateHeartbeat of heartbeatsCache) {
    const heartbeatEntry = heartbeatsToSend.find((hb) => hb.agent === singleDateHeartbeat.agent);
    if (!heartbeatEntry) {
      heartbeatsToSend.push({
        agent: singleDateHeartbeat.agent,
        dates: [singleDateHeartbeat.date]
      });
      if (countBytes(heartbeatsToSend) > maxSize) {
        heartbeatsToSend.pop();
        break;
      }
    } else {
      heartbeatEntry.dates.push(singleDateHeartbeat.date);
      if (countBytes(heartbeatsToSend) > maxSize) {
        heartbeatEntry.dates.pop();
        break;
      }
    }
    unsentEntries = unsentEntries.slice(1);
  }
  return {
    heartbeatsToSend,
    unsentEntries
  };
}
class HeartbeatStorageImpl {
  constructor(app) {
    this.app = app;
    this._canUseIndexedDBPromise = this.runIndexedDBEnvironmentCheck();
  }
  async runIndexedDBEnvironmentCheck() {
    if (!isIndexedDBAvailable()) {
      return false;
    } else {
      return validateIndexedDBOpenable().then(() => true).catch(() => false);
    }
  }
  /**
   * Read all heartbeats.
   */
  async read() {
    const canUseIndexedDB = await this._canUseIndexedDBPromise;
    if (!canUseIndexedDB) {
      return { heartbeats: [] };
    } else {
      const idbHeartbeatObject = await readHeartbeatsFromIndexedDB(this.app);
      if (idbHeartbeatObject === null || idbHeartbeatObject === void 0 ? void 0 : idbHeartbeatObject.heartbeats) {
        return idbHeartbeatObject;
      } else {
        return { heartbeats: [] };
      }
    }
  }
  // overwrite the storage with the provided heartbeats
  async overwrite(heartbeatsObject) {
    var _a;
    const canUseIndexedDB = await this._canUseIndexedDBPromise;
    if (!canUseIndexedDB) {
      return;
    } else {
      const existingHeartbeatsObject = await this.read();
      return writeHeartbeatsToIndexedDB(this.app, {
        lastSentHeartbeatDate: (_a = heartbeatsObject.lastSentHeartbeatDate) !== null && _a !== void 0 ? _a : existingHeartbeatsObject.lastSentHeartbeatDate,
        heartbeats: heartbeatsObject.heartbeats
      });
    }
  }
  // add heartbeats
  async add(heartbeatsObject) {
    var _a;
    const canUseIndexedDB = await this._canUseIndexedDBPromise;
    if (!canUseIndexedDB) {
      return;
    } else {
      const existingHeartbeatsObject = await this.read();
      return writeHeartbeatsToIndexedDB(this.app, {
        lastSentHeartbeatDate: (_a = heartbeatsObject.lastSentHeartbeatDate) !== null && _a !== void 0 ? _a : existingHeartbeatsObject.lastSentHeartbeatDate,
        heartbeats: [
          ...existingHeartbeatsObject.heartbeats,
          ...heartbeatsObject.heartbeats
        ]
      });
    }
  }
}
function countBytes(heartbeatsCache) {
  return base64urlEncodeWithoutPadding(
    // heartbeatsCache wrapper properties
    JSON.stringify({ version: 2, heartbeats: heartbeatsCache })
  ).length;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function registerCoreComponents(variant) {
  _registerComponent(new Component(
    "platform-logger",
    (container) => new PlatformLoggerServiceImpl(container),
    "PRIVATE"
    /* ComponentType.PRIVATE */
  ));
  _registerComponent(new Component(
    "heartbeat",
    (container) => new HeartbeatServiceImpl(container),
    "PRIVATE"
    /* ComponentType.PRIVATE */
  ));
  registerVersion(name$q, version$1, variant);
  registerVersion(name$q, version$1, "esm2017");
  registerVersion("fire-js", "");
}
registerCoreComponents("");
export {
  FirebaseError,
  SDK_VERSION,
  DEFAULT_ENTRY_NAME as _DEFAULT_ENTRY_NAME,
  _addComponent,
  _addOrOverwriteComponent,
  _apps,
  _clearComponents,
  _components,
  _getProvider,
  _isFirebaseApp,
  _isFirebaseServerApp,
  _registerComponent,
  _removeServiceInstance,
  _serverApps,
  deleteApp,
  getApp,
  getApps,
  initializeApp,
  initializeServerApp,
  onLog,
  registerVersion,
  setLogLevel
};
