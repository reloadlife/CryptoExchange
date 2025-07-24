import { useLocale as useNextIntlLocale, useTranslations } from "next-intl";

export function useLocale() {
  const locale = useNextIntlLocale();
  const t = useTranslations();

  return {
    locale,
    t,
    isEnglish: locale === "en",
    changeLocale: (newLocale: string) => {
      // This would typically involve routing or state management
      console.log("Changing locale to:", newLocale);
    },
  };
}
