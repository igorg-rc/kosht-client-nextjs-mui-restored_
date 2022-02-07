import axios from 'axios'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { Item, LangSwitcher, LeftMenuList, SectionTitle, SubscribeInput } from './UIUnits'
import { useState } from 'react'


export default function LeftMenu() {
  const [userInput, setUserInput] = useState("")
  const { locale, locales } = useRouter()
  const { t } = useTranslation('common')
  const fetcher = url => axios.get(url).then(res => res.data)
  const BASE_API_PATH = "https://kosht-api.herokuapp.com/api"
  // const BASE_API_PATH = "http://193.46.199.82:5000/api"

  const {data: categories, error: categoriesError} = useSWR(`${BASE_API_PATH}/categories`, fetcher)
  const {data: contacts, error: contactsError}     = useSWR(`${BASE_API_PATH}/contacts`, fetcher)
  const {data: tags, error: tagsError}             = useSWR(`${BASE_API_PATH}/tags`, fetcher)
  
  const onSubscribe = async e => { 
    const API_URL = `${BASE_API_PATH}/users`
    const success_message = `New subscriber with email ${userInput} was successfuly created!`
    try {
      if (userInput && userInput !== "") {
        await axios.post(API_URL, {email: userInput})
          .then(res => alert(success_message))
          .catch(error => console.log(error))
      } else {
        return
      }
      location.reload()
    } catch (error) {
      alert(error)
    }
  }

  if (categoriesError) return <div>Error: failed to load categories</div>
  if (tagsError) return <div>Error: failed to load tags</div>
  if (contactsError) return <div>Error: failed to load contacts</div>
  if (!categories) return null
  if (!tags) return null
  if (!contacts) return null

  return <>
    <Item>
      <LeftMenuList 
        items={categories} 
        locale={locale} 
        item="category"
        /> 
      <LeftMenuList 
        items={tags} 
        locale={locale} 
        item="tag" 
        />
      <SectionTitle 
        title={t('leftMenu.followUs')} 
        />
      <LeftMenuList 
        items={contacts.data} 
        locale={locale} 
      />
      <SectionTitle 
        title={t('leftMenu.subscribeHeader')} 
      />
      <SubscribeInput 
        placeholder={t('leftMenu.subscribePlaceholder')} 
        subscribe={t('leftMenu.subscribeLink')} 
        onChange={e => setUserInput(e.target.value)}
        onSubmit={onSubscribe} 
      /> 
    </Item>
    <Item>
      <LangSwitcher 
        locales={locales} 
      />
    </Item>
  </>
}