import Browser from "webextension-polyfill";

import { Storage } from "@plasmohq/storage";

export enum StorageKey {
  LENGTH = "length",
  HAS_UPPERCASE = "hasUppercase",
  HAS_LOWERCASE = "hasLowercase",
  HAS_NUMBERS = "hasNumbers",
  HAS_SYMBOLS = "hasSymbols",
  SYMBOLS_SET = "symbolsSet",
  IS_OPEN_HISTORY = "isOpenHistory",
  HISTORY = "history",
}

export interface Settings {
  [key: string]: string | number | boolean | string[];
  [StorageKey.LENGTH]: number;
  [StorageKey.HAS_UPPERCASE]: boolean;
  [StorageKey.HAS_LOWERCASE]: boolean;
  [StorageKey.HAS_NUMBERS]: boolean;
  [StorageKey.HAS_SYMBOLS]: boolean;
  [StorageKey.SYMBOLS_SET]: string;
  [StorageKey.IS_OPEN_HISTORY]: boolean;
  [StorageKey.HISTORY]: string[];
}

Browser.runtime.onInstalled.addListener(async () => {
  const defaultSettings: Settings = {
    [StorageKey.LENGTH]: 16,
    [StorageKey.HAS_UPPERCASE]: true,
    [StorageKey.HAS_LOWERCASE]: true,
    [StorageKey.HAS_NUMBERS]: true,
    [StorageKey.HAS_SYMBOLS]: true,
    [StorageKey.SYMBOLS_SET]: "!@#$%^&*()_+-=[]{};':\",./<>?\\|`~",
    [StorageKey.IS_OPEN_HISTORY]: true,
    [StorageKey.HISTORY]: [],
  };

  const storage = new Storage({ area: "local" });
  for (const key of Object.keys(defaultSettings)) {
    const oldConfig = await storage.get(key);
    if (!oldConfig) {
      storage.set(key, defaultSettings[key]);
    }
  }
});
