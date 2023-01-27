export const PreferredLanguageLocalStorageKey = 'i18nOverride'

export default {
  name: 'preferredLanguageOverride',

  lookup() {
    return localStorage.getItem(PreferredLanguageLocalStorageKey)
  }
};