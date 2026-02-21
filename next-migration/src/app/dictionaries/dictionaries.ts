import 'server-only';

const dictionaries = {
    ka: () => import('./ka.json').then(m => m.default),
    en: () => import('./en.gtc.json').then(m => m.default),
    ru: () => import('./ru.gtc.json').then(m => m.default),
}

export type Locale = keyof typeof dictionaries;

export const getDictionary = async (locale: Locale) => dictionaries[locale]();