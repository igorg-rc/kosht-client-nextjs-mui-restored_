import {useState} from 'react'
import { makeStyles } from '@mui/styles'
import axios from 'axios'
import Link from '../src/Link'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { PostSeparateListIndex } from '../components/PostList/PostSeparateListIndex'
import { SectionTitle } from '../components/UI/UIUnits'
import { Item } from '../components/UI/UIUnits'
import { Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Head from "next/head"
import moment from 'moment'
import 'moment/locale/en-gb'
import 'moment/locale/uk'

const useStyles = makeStyles(theme => ({
  main: {
    border: '1px solif #000',
  },
  linkText:{
    textAlign: 'left',
    fontSize: 18,
    fontWeight: 200,
    fontFamily: 'Gilroy-Bold, sans-serif',
    color: theme.palette.text.primary
  },
  topBage: {
    fontSize: 12,
    fontWeight: 600,
    lineHeight: '150%',
    textAlign: 'left',
    fontFamily: 'Gilroy-Bold, sans-serif',
    margin: '3px 0'
    // border: '1px solid red'
  },
  categoryLink: {
    fontSize: 12,
    color: '#5669FF',
    textDecoration: 'none',
    fontWeight: 600,
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  date: {
    margin: '0 8px',
    color: '#B8B8B8',
    fontStyle: 'normal',
    fontWeight: 'normal'
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main, 
    '&:hover': {
      color: theme.palette.secondary.main,
      transition: '0.5s'
    }
  },
  textDescripton:{
    borderRadius: '5px',
    maxWidth: '100%',
    textAlign: 'left',
    fontSize: 14,
    fontStyle: 'normal',
    lineHeight: '160%',
    fontFamily: 'Roboto, sans-serif',
    color: '#2E3A59'
  }
}))


const Index = ({posts, listItems}) => {
  // const { t } = useTranslation("common")
  const router = useRouter()
  const styles = useStyles()
  const [showMore, setShowMore] = useState(true)
  const [expanded, setExpanded] = useState(true)

  const localeUA = router.locale === "uk"
  const titleUA = 'Кошт | Говоримо про персональні фінанси'
  const titleEN = 'Kosht | We talk about personal finances'

  if (router.isFallback) return <div>Loading...</div>

  return (
    <>
      {/* <Head>
        <title>{router.locale === "uk" ? titleUA : titleEN}</title>
        <title>{t("head.mainTitle")} | {t("head.indexTitle")}</title>
        <meta name="description" content={t("head.indexDescription")} />
        <meta name="keywords" content={t("head.indexKeywords")} />
      </Head> */}
      {/* <h1  style={{ textAlign: 'center' }}>{!localeUA ? "Index page" : "Головна"}</h1> */}
      <PostSeparateListIndex
        label={router.locale === "uk" ? "Головне" : "Main news"}
        items={showMore ? listItems?.slice(0, 5) : listItems?.slice(0, listItems.length)}
        showMore={showMore}
        expanded={expanded}
        toggleExpanded={() => setExpanded(!expanded)}
        toggleShowMore={() => setShowMore(!showMore)} 
      />

      {posts?.map(i =>  <div key={i._id} style={{ border: '1px sold #000', marginBottom: 20 }}>
        <Item >
        <div style={{ border: '1px sold #000', padding: '20px 0' }}>
          <Typography paragraph className={styles.topBage}>
            {i.categories.map(item => (
              <Link 
                key={item._id}
                href={`/category/${item.slug}`} 
                className={styles.categoryLink}
              >
                <span className="category-badge">
                  {router.locale === "uk" ? item.title_ua :  item.title_en}
                </span>
              </Link>
            ))}
          <span className={styles.date}>
            {new Date(Date.now()).getDate() - new Date(i.createdAt).getDate()  < 30 ?
              (router.locale === "uk" ? 
                moment.utc(i.createdAt).local().locale('uk').fromNow() : 
                moment.utc(i.createdAt).local().locale('en-gb').fromNow()
              ) :
              moment.utc(i.createdAt).local().format('DD MMM YYYY')} 
          </span>   
        </Typography>  
          <SectionTitle link>
            <Link className={styles.link} href={`/${i.slug}`}>
              {i.title}
            </Link>
          </SectionTitle>
          <Typography 
            component="p" 
            className={styles.textDescripton}
          >{i.description}
          </Typography>
          {i.imgUrl && <Image src={i.imgUrl} />}
          </div>
        </Item>
      </div>)} 

    </>
  );
}

// Index.getInitialProps = async (context) => {
//   const fetchedPosts = await axios.get('https://kosht-api.herokuapp.com/api/posts')  
//   // const res = await axios.get('https://kosht-api.herokuapp.com/api/lists/slug/main-news')
//   // const listItems = res.data.posts
//   const posts = fetchedPosts.data.data

//   return {
//     props: {
//       posts, 
//       // listItems,
//       // ...await serverSideTranslations(context.locale, ['common']) 
//     } 
//   }
// }

export default Index

export async function getServerSideProps({locale}) {
  const res = await axios.get('https://kosht-api.herokuapp.com/api/posts')
  const posts = res.data.data
    
  const resItems = await axios.get('https://kosht-api.herokuapp.com/api/lists/slug/main-news')
  const listItems = resItems.data.posts
    

  // const postsList = await axios.get(`https://kosht-api.herokuapp.com/api/posts/tags/monobank`)
  // const posts = postsList.data

  return {
    props: {
      posts, 
      listItems,
      ...await serverSideTranslations(locale, ['common']) 
    } 
  }
}
