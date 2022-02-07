import axios from "axios"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useRouter } from "next/router"
import { Item, SectionTitle } from "../components/UI/UIUnits"
import { makeStyles } from "@mui/styles"
import { Typography } from "@mui/material"
import Link from "../src/Link"
import Image from "next/image";
import { SRLWrapper } from "simple-react-lightbox"
import moment from 'moment'
import 'moment/locale/en-gb'
import 'moment/locale/uk'

const API_LINK = "https://kosht-api.herokuapp.com/api/posts"

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
  },
  categoryLink: {
    fontSize: 12,
    color: '#5669FF',
    fontFamily: 'Gilroy-Bold, sans-serif',
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


export default function Post({ post }) {
  const router = useRouter()
  const styles = useStyles()

  return <>
    {/* <Item>
      <div style={{ padding: '0 20px' }}>
      <h2>{slug}</h2>
      <h4>{post.title}</h4>
      <p style={{ textAlign: 'justify' }}>{post.body}</p> 
      </div>
    </Item> */}
    <Item style={{ border: '1px sold #000' }} key={post._id}>
      <div style={{ border: '1px sold #000', padding: '20px 0' }}>
      <Typography paragraph className={styles.topBage}>
        {post.categories?.map(item => (
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
        {new Date(Date.now()).getDate() - new Date(post.createdAt).getDate()  < 30 ?
          (router.locale === "uk" ? 
            moment.utc(post.createdAt).local().locale('uk').fromNow() : 
            moment.utc(post.createdAt).local().locale('en-gb').fromNow()
          ) :
          moment.utc(post.createdAt).local().format('DD MMM YYYY')} 
      </span>   
    </Typography>  
      <SectionTitle title={post.title} />
        <div 
          className="post-content post-content-detail" 
          dangerouslySetInnerHTML={{__html: post.body}}
          >
      </div>
      <SRLWrapper>
        {post.imgUrl && <Image src={post.imgUrl} srl_gallery_image="true" maxWidth="100%" />}
      </SRLWrapper>
      </div>
    </Item>
  </>
  
}


export async function getStaticPaths({locales}) {
  const res = await axios.get(API_LINK)
  const posts = res.data

  const paths = posts.data.map(post => (
    { params: { slug: post.slug }, locale: "uk" },
    { params: { slug: post.slug }, locale: "en" }
  ))

  return {
    paths: paths,
    fallback: 'blocking'
  }
}

export async function getStaticProps(context) {
  const res = await axios.get(`${API_LINK}/slug/${context.params.slug}`)
  const post = res.data

  return { 
    props: { 
      params: context.params,
      post, 
      ...await serverSideTranslations(context.locale, ["common"]) 
    } 
  }
}