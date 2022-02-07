import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  main: {
    boxShadow: 'boxShadow: 0px 8px 25px rgba(83, 89, 144, 0.07)',
    paddingBottom: 30
  },
  bannerImg: {
    borderRadius: 6,
    width: '100%',
    height: 'auto',
    '&:hover': {
      cursor: 'pointer'
    }
  }
}))

export const Banner = props => {
  const { link, src, onBannerClick } = props
  const styles = useStyles()
  
  return <div className={styles.main} onClick={onBannerClick}>
    <a href={link} target="_blank">
      <img src={src} className={styles.bannerImg} />
    </a>
  </div>
}