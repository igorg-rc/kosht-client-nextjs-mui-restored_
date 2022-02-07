import { useEffect, useState } from "react"
import { Link, useRouteMatch } from "react-router-dom"
import { get_posts_by_tag } from "../../api/api"
import { makeStyles } from "@material-ui/styles"
import { PostGeneralView } from "./PostGeneralView"
import { PageMessage } from "../UI/PageMessage"
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
    '&:hover': {
      textDecoration: 'underline'
    }
  }
}))

export const PostTagIndex = () => {
  const styles = useStyles()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const match = useRouteMatch()

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      const fetchedPosts = await get_posts_by_tag(match.params.slug)
      setPosts(fetchedPosts)
      setLoading(false)
    }
    fetchPosts()
  }, [match.params.slug])

  console.log(posts)

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
              <Link 
                key={i._id} 
                to={(`/category/${(i.slug)}`)} 
                className={styles.categoryLink}>
                <span className={styles.linkText}>{i.title_ua}</span>
              </Link>
            ))}
          />
        </div>
      )) : <PageMessage message={`Posts on tag ${match.params.slug} were not found!`} />
      // "${(match.params.slug).charAt(0).toUpperCase()}${(match.params.title_en).slice(1)}" were not found!`} />
    }
  </>
}