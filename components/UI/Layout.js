import { Grid } from '@mui/material'
import { MyContainer } from './UIUnits'
import { Header } from './Header'
import { RightMenu } from './RightMenu_'
import LeftMenu from './LeftMenu'
import { ThemeProvider } from '@mui/styles'
import theme from "../../src/theme"

export default function Layout({ children }) {
  return <ThemeProvider theme={theme}>
    <MyContainer>
      <Header />
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <LeftMenu />
        </Grid>
        <Grid item xs={6}>
          {children}
        </Grid>
        <Grid item xs={3}>
          <RightMenu />
        </Grid>
      </Grid>
    </MyContainer>
  </ThemeProvider>
}
