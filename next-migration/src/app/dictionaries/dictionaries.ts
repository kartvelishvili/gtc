import 'server-only';

const dictionaries = {
    ka: () => import('./ka.json'),
    en: () => import('./en.gtc.json'),
    ru: () => import('./ru.gtc.json'),
}

export type Locale = keyof typeof dictionaries;

export const getDictionary = async (locale: Locale) => dictionaries[locale]();