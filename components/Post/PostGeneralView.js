import { makeStyles } from "@material-ui/styles";
import { Typography } from '@material-ui/core'
import { Link, useHistory, useRouteMatch } from 'react-router-dom'
import { SRLWrapper } from "simple-react-lightbox"
import moment from 'moment'
import 'moment/locale/uk'

const useStyles = makeStyles(theme => ({
  main: {
    padding: '20px 20px 10px 20px',
    background: '#fff',
    boxShadow: '0px 8px 25px rgba(83, 89, 144, 0.07)',
    borderRadius: 6,
    // border: '1px solid blue'
  },
  content: {
    // border: '1px solid red'
  },
  topBage: {
    fontSize: 12,
    fontWeight: 600,
    lineHeight: '150%',
    textAlign: 'left',
    fontFamily: 'Gilroy, sans-serif',
    margin: '3px 0'
    // border: '1px solid red'
  },
  categoryLink: {
    fontSize: 12,
    color: '#5669FF',
    textDecoration: 'none',
    fontWeight: 600
  },
  sectionTitle: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
    padding: 3,
    borderRadius: '3px',
    '&:hover': {
      textDecoration: 'underline',
      cursor: 'pointer'
    }
  },
  date: {
    margin: '0 8px',
    color: '#B8B8B8',
    fontStyle: 'normal',
    fontWeight: 'normal'
  },
  title: {
    textAlign: 'left',
    lineHeight: '150%',
    fontSize: 18,
    fontWeight: 800,
    fontFamily: 'Gilroy, sans-serif',
    color: theme.palette.text.primary,
    // padding: '-5px 0 10px 0',
    // border: '1px solid red',
  },
  titleText: {
    textDecoration: 'none',
  },
  titleLink: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.text.secondary,
      transition: '0.5s'
    }
  },
  description: {
    paddingTop: '5px'
  },
  // body: {
  //   fontFamily: 'Roboto, sans-serif',
  //   fontSize: 14,
  //   fontWeight: 500,
  //   letterSpacing: 0.5
  // },
  posterImage: {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '6px',
    // border: '1px solid red'
  }
}))


export const PostGeneralView = props => {
  const { title, description, body, categories, date, posterImage, posterVideo, slug } = props
  const styles = useStyles()
  const history = useHistory()
  const match = useRouteMatch()

  const postDetailContent = <div className={styles.content}>
    <SRLWrapper>
      <div className="post-content post-content-detail" dangerouslySetInnerHTML={{__html: body}}></div>
    </SRLWrapper>
  </div>

  const postListContent = <div className={styles.content}>
    <div className="post-content">
      <Typography className={styles.description} paragraph>{description}</Typography>
    </div>
    { posterVideo &&
      <div className={styles.posterImage}> 
        <iframe 
          className="ql-video ql-align-center ql-iframe" 
          width="100%"
          height="315"
          frameBorder="0" 
          title="Embedded video" 
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" 
          src={`${posterVideo}?autoplay=${(window.innerWidth <= 1 && window.innerWidth <= 1) ? 1 : 0}&mute=1`}
        />
      </div>
    } 
    { posterImage ? <img className={styles.posterImage} src={posterImage} alt={title} /> : null }
  </div>

  const postCreationDate = new Date(date)
  const nowDate = new Date(Date.now())
  const dateDiff = nowDate.getDate() - postCreationDate.getDate() 

  return <div className={styles.main}>
    <Typography paragraph className={styles.topBage}>
      <span className={styles.categoryLink}>{categories}</span>
      <span className={styles.date}>
        {/* if post was created less then 30 days ago is "time_ago" format , otherwise "date: day month year" */}
        {dateDiff < 30 ? moment.utc(date).local().fromNow() : moment.utc(date).local().format('DD MMM YYYY')} 
      </span> 
    </Typography>
    <div 
      style={{ 
        cursor: (
          !match.params.slug || match.path.includes('category') || 
          match.path.includes('tag')) && 'pointer' 
        }} 
      onClick={() => (
        !match.params.slug              || 
        match.params.query              || 
        match.path.includes('category') || 
        match.path.includes('tag')      || 
        match.path.includes('search') ) ? 
        history.push(`/${slug}`) : console.log(match.params.slug)
      }
    >
    <Typography variant="h1" component="h1" className={styles.title}>
      { 
        !match.params.slug              || 
        match.path.includes('category') || 
        match.path.includes('tag')      || 
        match.path.includes('search')   ? 
        <Link to={`/${slug}`} className={styles.titleLink}>{title}</Link> : 
        <span className={styles.titleText}>{title}</span> 
      }
    </Typography>
      { 
        !match.params.slug              || 
        match.path.includes('category') || 
        match.path.includes('tag')      || 
        match.path.includes('search')   ? 
        postListContent :  postDetailContent 
      }
    </div>
  </div>
}