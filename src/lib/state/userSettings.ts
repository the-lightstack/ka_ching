import { localStorageSettingsStr } from "$lib/constants";
import type { UserSettings } from "$lib/types";
import { persisted, type Persisted } from "svelte-persisted-store";


export const userSettings:Persisted<UserSettings> = persisted(localStorageSettingsStr,{
    workStartTime: 7*60,
    workEndTime: 17*60,
    hourlyWage: 12.0
});