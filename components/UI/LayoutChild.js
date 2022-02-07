import { Container, Grid, useMediaQuery,  useTheme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Header } from '../UI/Header'
import { LeftMenu } from './LeftMenu'
import { RightMenu } from './RightMenu'
import { useRouteMatch } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  content: {
  },
  leftMenuGrid: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    },
  },
  contentGrid: {
    [theme.breakpoints.up("xs") && theme.breakpoints.down("sm")]: {
      // marginTop: -30
    }
  }
}))

export const LayoutChild = ({ children }) => {
  const styles = useStyles()
  const theme = useTheme()
  const match = useRouteMatch()              
  const isLargerSM = useMediaQuery(theme.breakpoints.up("sm"))
  const isSmallerMD = useMediaQuery(theme.breakpoints.down("md"))
  // const isLargerXS = useMediaQuery(theme.breakpoints.up("xs"))
  // const isSmallerSM = useMediaQuery(theme.breakpoints.down("sm"))

  return <>
    <Header className={styles.header}  />
      {/* <div className={styles.content}>
        <Container className={styles.mainContainer}>
          <Grid container spacing={3}>
            <Grid item md={3} lg={3} className={styles.leftMenuGrid}>
              <LeftMenu />
            </Grid>
            <Grid item sm={12} md={9} lg={6} className={styles.contentGrid}>
              {children}
            </Grid>
            <Grid item sm={12} md={false} lg={3} className={styles.rightMenuGrid}>
              <RightMenu />
            </Grid> 
          </Grid>
        </Container>
      </div> */}


    { (isSmallerMD && isLargerSM) ? 
      <div className={styles.content}>
        <Container className={styles.mainContainer}>
          <Grid container spacing={3}>
            <Grid item md={4} className={styles.leftMenuGrid}>
              <LeftMenu />
              <RightMenu />
            </Grid>
            <Grid item md={8} className={styles.contentGrid}>
              {children}
            </Grid>
          </Grid>
        </Container>
      </div> 
      :
      ( 
      //=========== primary layout - big screen ============ //
        <div className={styles.content}>
          <Container className={styles.mainContainer}>
            <Grid container spacing={3} >
              <Grid item sm={12} md={12} lg={9} className={styles.contentGrid}>
                {children}
              </Grid>
              <Grid item sm={12} md={12} lg={3} className={styles.rightMenuGrid}>
                <RightMenu />
              </Grid> 
            </Grid>
          </Container>
        </div>
      )
    }
  </>
}