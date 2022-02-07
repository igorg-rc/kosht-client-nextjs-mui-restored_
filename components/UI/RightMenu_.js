import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"
import { Item } from "./UIUnits"

export const RightMenu = props => {

  const { locale } = useRouter()
  const { t } = useTranslation('common')
  const greeting = locale === "en" ? "Hello World!" : "Привіт, Світ!"

  return <>
    <Item>
      <p>{t('separateList.titleNews')}</p>
      <h3>{t('separateList.titleCurrenciesToday')}</h3>
      <p>{greeting}</p>
    </Item>
  </>
}