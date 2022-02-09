import axios from "axios"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useRouter } from "next/router"
import { Item, SectionTitle } from "../components/UI/UIUnits"
import { PostSeparateListIndex } from "../components/PostList/PostSeparateListIndex"
import { makeStyles } from "@mui/styles"
import { Typography } from "@mui/material"
import Link from "../src/Link"
import Image from "next/image"
import { SRLWrapper } from "simple-react-lightbox"
import moment from 'moment'
import Head from "next/head"
import 'moment/locale/en-gb'
import 'moment/locale/uk'
import { useState } from "react"
import { useTranslation } from "next-i18next"
// import { RightMenuPostList } from "../components/PostList/PostLists"

// const API_LINK = "http://193.46.199.82:5000/api/posts"
const API_LINK = "https://kosht-api.herokuapp.com/api/posts"
const READMORE_LINK = 'https://kosht-api.herokuapp.com/api/posts/readmore'

const useStyles = makeStyles(theme => ({
  main: {
    border: '1px solif #000',
    // paddingBottom: 20
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


export default function Post({ post, fetchedPosts }) {
  const { t } = useTranslation("common")
  const router = useRouter()
  const styles = useStyles()
  const [showMore, setShowMore] = useState(true)
  const [expanded, setExpanded] = useState(true)

  const tags = post?.tags.map(tag => (
    router.locale === "ua" ? tag.title_ua : tag.title_en 
  )).toString()


  return <>
    <Head>
      <title>{t("head.mainTitle")} | {post.title}</title>
      <meta name="description" content={post.description} />
      <meta name="tags" content={tags} />
    </Head>
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
        {new Date(Date.now()).getDate() - new Date(post.createdAt).getDate() < 30 ?
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
        {post.imgUrl && <Image 
          src={post.imgUrl} 
          srl_gallery_image="true" 
          maxWidth="100%" 
        />}
      </SRLWrapper>
      </div>
    </Item>

    {/* <RightMenuPostList 
      items={fetchedPosts}
      label={router.locale === "uk" ? "Читайте ще" : "Read more"}
    /> */}

    <PostSeparateListIndex
      label={router.locale === "uk" ? "Читайте також" : "Read more"}
      items={showMore ? fetchedPosts.slice(0, 5) : fetchedPosts.slice(0, 10)}
      showMore={showMore}
      expanded={expanded}
      toggleExpanded={() => setExpanded(!expanded)}
      toggleShowMore={() => setShowMore(!showMore)} 
    />
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
  const resPost = await axios.get(`${API_LINK}/slug/${context.params.slug}`)
  const resItems = await axios.get(`${READMORE_LINK}/${context.params.slug}`)
  const post = resPost.data
  const fetchedPosts = resItems.data

  return { 
    props: { 
      fetchedPosts,
      post, 
      ...await serverSideTranslations(context.locale, ["common"]) 
    } 
  }
}