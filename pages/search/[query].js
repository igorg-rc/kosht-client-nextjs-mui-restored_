import axios from "axios"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { Typography } from "@mui/material";
import Link from "../../src/Link";
import { useRouter } from "next/router";
import { Item, SectionTitle } from "../../components/UI/UIUnits"
import { useTheme, makeStyles } from "@mui/styles"
import Image from "next/image";
import moment from 'moment'
import 'moment/locale/en-gb'
import 'moment/locale/uk'
import { useTranslation } from "next-i18next";

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


export default function Query({query, posts}) {
  const styles = useStyles()
  const router = useRouter()
  const { t } = useTranslation("common")

  return <>
  { (posts && posts.length > 0) 
  ?
  <> 
  <SectionTitle title={`${t("search.searchQuery")} "${query}"`} /> 
  {posts.map(i => <Item style={{ border: '1px sold #000' }} key={i._id}>
      <div style={{ border: '1px sold #000', padding: '20px 0' }}>
      <Typography paragraph className={styles.topBage}>
        {i.categories.map(item => (
          <Link 
            key={item._id}
            href={`/category/${item.slug}`} 
            className={styles.categoryLink}
          >
            <span style={{ marginRight: 3 }}>
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
    </Item>)} 
  </>
  : 
  <>
    <SectionTitle 
      title={`${t("search.searchQuery")} "${query}"`} 
    /> 
    <SectionTitle 
      title={t("search.searchMessage")} 
    />
  </> }

  </>
}

export async function getServerSideProps(context) {
  const query = context.params.query
  const API_LINK ="https://kosht-api.herokuapp.com/api/search"
  const postsList = await axios.get(`${API_LINK}/${encodeURI(query)}`)
  const posts = postsList.data.data

  return { 
    props: { 
      query, 
      posts, 
      ...await serverSideTranslations(context.locale, ["common"]) 
    } 
  }
}