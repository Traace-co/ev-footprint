import { StringMap, TOptions } from 'i18next';
import {
  useTranslation as __useTranslation
} from 'react-i18next';
import { I18nKey } from '../generated/i18n-types';

export function useTypedTranslation() {
  const { t: __t, i18n } = __useTranslation();
  const t = (key: I18nKey, options?: TOptions<StringMap> | string) =>
    __t(key, options);

  return { t, i18n };
}