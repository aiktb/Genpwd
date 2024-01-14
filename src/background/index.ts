import Browser from "webextension-polyfill";

import { Storage } from "@plasmohq/storage";

export enum SettingEnum {
  LENGTH = "length",
  UPPERCASE = "uppercase",
  LOWERCASE = "lowercase",
  NUMBERS = "numbers",
  SYMBOLS = "symbols",
  CHARACTERS_SET = "charactersSet",
}

export interface Settings {
  [key: string]: string | number | boolean;
  [SettingEnum.LENGTH]: number;
  [SettingEnum.UPPERCASE]: boolean;
  [SettingEnum.LOWERCASE]: boolean;
  [SettingEnum.NUMBERS]: boolean;
  [SettingEnum.SYMBOLS]: boolean;
  [SettingEnum.CHARACTERS_SET]: string;
}

Browser.runtime.onInstalled.addListener(async () => {
  const defaultSettings: Settings = {
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    charactersSet: "!@#$%^&*()_+-=[]{};':\",./<>?\\|`~",
  };

  const storage = new Storage();
  for (const key of Object.keys(defaultSettings)) {
    const oldConfig = await storage.get(key);
    if (!oldConfig) {
      storage.set(key, defaultSettings[key]);
    }
  }
});
