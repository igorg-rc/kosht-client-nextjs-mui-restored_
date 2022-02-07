import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { makeStyles } from "@material-ui/styles"
import { PostGeneralView } from "../componenents/Post/PostGeneralView"
import { PageMessage } from "../componenents/UI/PageMessage"
import { SpinnerContent } from "../componenents/UI/SpinnerContent"
import { PostSeparateListIndex } from "../componenents/PostList/PostSeparateListIndex"
import { Banner } from "../componenents/UI/Banner"
import { useTranslation } from'react-i18next'
import { get_list_by_slug, get_posts, get_visible_banners, click_banner } from "../api/api"

const useStyles = makeStyles(theme => ({
  main: {
    marginBottom: 30,
  },
  categoryLink: {
    color: theme.palette.text.secondary,
    textDecoration: 'none',
    marginRight: 4,
    fontSize: 12,
    fontFamily: 'Gilroy, sans-serif',
  },
  linkText: {
    '&:hover': {
      textDecoration: 'underline'
    }
  }
}))


export const PostList = () => {
  const styles = useStyles()
  const { t } = useTranslation()
  const [posts, setPosts] = useState([])
  const [showMore, setShowMore] = useState(true)
  const [expanded, setExpanded] = useState(true)
  const [mainNewsLabel, setMainNewsLabel] = useState("")
  const [mainNews, setMainNews] = useState([])
  const [mainNewsMore, setMainNewsMore] = useState([])
  const [loading, setLoading] = useState(false)
  const [banner, setBanner] = useState()
  const [bannerImg, setBannerImg] = useState()
  const [bannerLink, setBannerLink] = useState()
  const [bannerClicks, setBannerClicks] = useState()

  useEffect(() => {
    const setContent = async () => {
      setLoading(true)
      const fetchedPosts = await get_posts()
      const newsWeek = await get_list_by_slug("main-news")
      const newsWeekTitle = t("separateList.titleNewsWeek")
      const selected_banner = await get_visible_banners()
      selected_banner && setBanner(selected_banner.data)
      selected_banner && setBannerImg(selected_banner.data.imgUrl)
      selected_banner && setBannerLink(selected_banner.data.link)
      selected_banner && setBannerClicks(selected_banner.data.clicks)
      setMainNewsLabel(newsWeekTitle)
      setMainNews(newsWeek.posts.slice(0, 4))
      setMainNewsMore(newsWeek.posts.slice(0, 10))
      setPosts(fetchedPosts)
      setLoading(false)
    }
    setContent()
  }, [t])

  const bannerClickHandler = async () => {
    setBannerClicks(bannerClicks + 1)
    await click_banner()
  }

  console.log(banner)

  return <>

      { !loading ? <> 
      { banner ? 
      <Banner 
        src={`http://localhost:5000/${banner.imgUrl}`} 
        onBannerClick={bannerClickHandler} 
        link={banner.link}  
      />
      : null
      }
      <PostSeparateListIndex 
        items={showMore ? mainNews : mainNewsMore} 
        label={mainNewsLabel} 
        showMore={showMore}
        expanded={expanded}
        toggleExpanded={() => setExpanded(!expanded)}
        toggleShowMore={() => setShowMore(!showMore)}  
      /> 
      { (posts && posts.length > 0) && posts.map(post => (
        <div className={styles.main} key={post._id} >
          <PostGeneralView 
            title={post.title}
            slug={post.slug}
            posterImage={post.posterImage}
            posterVideo={post.posterVideo}
            date={post.createdAt}
            id={post._id}
            description={post.description}
            categories={post.categories && post.categories.map(i => (
              <Link 
                key={i._id} 
                to={(`/category/${(i.slug)}`).toLowerCase()} 
                className={styles.categoryLink}
              ><span className={styles.linkText}>{i.title_ua}</span>
              </Link>
            ))}
          />
        </div> )) } 
        { (posts.length == 0) && <PageMessage message={t("postList.noPosts")} />  }
        </>
      : <><SpinnerContent loadingStatus={loading} items={posts} /></> }
  </>
}