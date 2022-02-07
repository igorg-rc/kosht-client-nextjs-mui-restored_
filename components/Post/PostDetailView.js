import { Typography, Card, CardActionArea, CardMedia, CardContent, CardActions, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Link } from 'react-router-dom'
import { SRLWrapper } from "simple-react-lightbox"

const useStyles = makeStyles(theme => ({
  main: {
    padding: 20,
    background: '#fff',
    border: '1px solid rgba(0,0,0, 0.15)',
    borderRadius: 5
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
    color: theme.palette.primary.main,
    textDecoration: 'none',
    padding: 3,
    borderRadius: '3px',
    background: 'rgba(0,0,0, 0.07)',
    '&:hover': {
      textDecoration: 'underline',
      cursor: 'pointer'
    }
  },
  // date: {
  //   padding: 3,
  //   margin: '0 5px',
  //   borderLeft: '1px solid rgba(0,0,0, 0.3)',
  // },
  title: {
    textAlign: 'left',
    paddingBottom: '2vh',
    fontSize: 28,
    fontWeight: 800,
    fontFamily: 'Gilroy-Medium, sans-serif',
    color: '2E3A59'
  },
  body: {
    textAlign: 'justify',
    fontFamily: 'Gilroy-Medium, sans-serif',
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

export const PostDetailView = props => {
  const { title, body, imgPoster, date, sectionTitle, sectionLink, categories } = props
  const styles = useStyles()

  return <div className={styles.main}>
    <Typography paragraph className={styles.topBage}>
      <Link to={`/category/${sectionLink}`} className={styles.categoryLink}>
        <span className={styles.sectionTitle}>{sectionTitle}</span>
      </Link> 
      <span className={styles.date}>{date}</span> 
    </Typography>
    <Typography variant="h4" component="h4" className={styles.title}>{title}</Typography>
    <SRLWrapper>
      <div className="post-content" dangerouslySetInnerHTML={{__html: body}}></div>
    </SRLWrapper>
    { imgPoster ? <img className={styles.imgPoster} src={imgPoster} alt={title} /> : null }

    <Card className={styles.root}>
      <CardActionArea>
        <CardMedia
          className={styles.media}
          image={imgPoster}
          title={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">{ title }</Typography>
          <SRLWrapper>
            <div className="post-content" dangerouslySetInnerHTML={{__html: body}}></div>
          </SRLWrapper>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          { categories }
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  </div>
}
