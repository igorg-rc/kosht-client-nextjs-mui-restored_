import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Link, useHistory } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  main: {
    padding: 20,
    background: '#fff',
    border: '1px solid rgba(0,0,0, 0.15)',
    borderRadius: 5,
    backgroundColor: 'lightGrey'
  },
  topBage: {
    fontSize: 14,
    textAlign: 'left',
    fontFamily: 'Play, sans-serif'
  },
  categoryLink: {
    textDecoration: 'none'
  },
  sectionTitle: {
    color: theme.palette.text.primary,
    padding: 3,
    borderRight: 5,
    borderRadius: '3px',
    background: 'rgba(0,0,0, 0.07)',
    '&:hover': {
      textDecoration: 'underline',
      cursor: 'pointer'
    }
  },
  date: {
    padding: 3,
    margin: '0 5px',
    borderLeft: '1px solid rgba(0,0,0, 0.3)',
  },
  title: {
    textAlign: 'left',
    paddingBottom: '2vh',
    fontSize: 28,
    fontWeight: 800,
    fontFamily: 'Gilroy-Bold, sans-serif'
  },
  titleLink: {
    color: '#000',
    textDecoration: 'none',
    '&:hover': {
      cursor: 'pointer',
      color: '#2E3A59',
      transition: '0.5s'
    }
  },
  content: {
    '&:hover': {
      cursor: 'pointer'
    }
  },
  description: {
    textAlign: 'justify',
    fontFamily: 'Gilroy-Bold, sans-serif',
    fontSize: 18,
    fontWeight: 500,
    letterSpacing: 0.5
  },
  imgPoster: {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: 5
  }
}))

export const PostListView = props => {
  const { title, description, imgPoster, date, body, id, categories } = props
  const styles = useStyles()
  const history = useHistory()

return <div className={styles.main}>
  <Typography paragraph className={styles.topBage}>
    {categories}
    <span className={styles.date}>{date}</span> 
  </Typography>
  <div className={styles.content} onClick={() => history.push(`/${id}`)}>
    <Typography variant="h4" component="h4" className={styles.title}>
      <Link className={styles.titleLink} to={`/${id}`}>{title}</Link> 
    </Typography>
    <div className="post-content" dangerouslySetInnerHTML={{__html: body}}></div>
    <Typography className={styles.description}>{description}</Typography>
    { imgPoster ? <img className={styles.imgPoster} src={imgPoster} alt={title} /> : null }
  </div>
</div>
}