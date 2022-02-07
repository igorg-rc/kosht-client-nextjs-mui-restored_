import { useEffect, useState } from "react"
import { Link, useRouteMatch } from "react-router-dom"
import { makeStyles } from "@material-ui/styles"
import { get_posts_by_category } from "../../api/api"
import { PageMessage } from "../UI/PageMessage"
import { PostGeneralView } from "./PostGeneralView"
import { SpinnerContent } from "../UI/SpinnerContent"

const useStyles = makeStyles(theme => ({
  main: {
    marginBottom: 30,
    width: '100%'
  },
  categoryLink: {
    color: theme.palette.text.secondary,
    textDecoration: 'none',
    marginRight: 5,
  },
  linkText: {
    fontWeight: 600,
    '&:hover': {
      textDecoration: 'underline'
    }
  }
}))

export const PostCategoryIndex = () => {
  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState(false)
  const match = useRouteMatch()
  const styles = useStyles()
  
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      const fetchedPosts = await get_posts_by_category(match.params.slug)
      setPosts(fetchedPosts)
      setLoading(false)
    }
    fetchPosts()
  }, [match.params.slug])

  return <>
    { loading ? <SpinnerContent loadingStatus={loading} /> :
      (posts && posts.length !== 0) ? posts.map(post => (
        <div className={styles.main} key={post._id}>
          <PostGeneralView 
            id={post._id}
            imgPoster={post.imgPoster}
            videoPoster={post.videoPoster}
            date={post.createdAt}
            title={post.title}
            slug={post.slug}
            description={post.description}
            categories={post.categories && post.categories.map(i => (
              <Link key={i._id} to={(`/category/${(i.slug)}`).toLowerCase()} className={styles.categoryLink}>
                <span className={styles.linkText}>{i.title_ua}</span>
              </Link>
            ))}
          />
        </div>
      )) : <PageMessage message={`Posts on tag 
    "${(match.params.slug).charAt(0).toUpperCase()}${(match.params.slug).slice(1)}" were not found!`} />
    }
  </>
}