import { useRouter } from 'next/router'
import { makeStyles } from '@mui/styles'
import { useState, useRef } from 'react'
import Image from 'next/image'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import { TextField } from '@mui/material';
import { InputAdornment } from '@mui/material';
import searchIcon from '../../files/images/UI/search.png'
import { useTranslation } from 'next-i18next';
import { SectionTitle } from './UIUnits';

const useStyles = makeStyles(theme => ({
  root: {
    // flexGrow: 1,
    [theme.breakpoints.down('xs')]: {
      marginBottom: 10,
      paddingBottom: 10
    },
  },
  appBar: {
    // background: '#F9F9F9',
    background: 'grey',
    height: '100px',
    display: 'flex',
    alignItems: 'center'
  },
  appBarMobile: {
    background: '#F9F9FB',
    height: '100px',
    display: 'flex',
    alignItems: 'center',
    marginBottom: 20
  },
  toolbar: {
    top: 18,
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  toolbarMobileTop: {
    marginBottom: 5,
  },
  toolbarMobileBottom: {
    marginTop: 5
  },
  brandLink: {
    height: 30,
    // width: 66,
    margin: 0,
    padding: '16px 0',
    fontWeight: 700,
    fontSize: 14,
    fontFamily: 'Gilroy',
    fontWeight: 800,
    borderRadius: 6,
    background: '#2E3A59',
    color: "#fff", 
    '&:hover': {
      background: '#2E3A59'
    },
    [theme.breakpoints.down('sm')]: {
      padding: '5px 0px',
      margin: '0 auto 0 3px',
      top: 2
    }
  },
  brandPhrase: {
    fontFamily: 'Gilroy, sans-serif',
    fontWeight: 800,
    fontSize: 18,
    lineHeight: '180%',
    color: theme.palette.text.primary,
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  search: {
    height: '37px',
    width: '100px',
    borderRadius: '8px',
    '&:hover': {
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('xs')]: {
      marginLeft: 'auto',
      width: 'auto',
    },
    [theme.breakpoints.up('xs') && theme.breakpoints.down('md')]: {
      marginLeft: 'auto',
      textAlign: 'right',
      left: 50
    }
  },
  searchInput: {
    padding: 0,
    margin: 0,
    color: 'red',
    border: '1px solid #fff',
    [theme.breakpoints.down('xs')]:{
      display: 'none'
    }
  },
  noBorder: {
    border: 'none'
  },
  endAdornment: {
    marginRight: 0,
    paddingRight: 0
  },
  searchBtn: {
    minWidth: 35,
    borderRadius: 8,
    textTransform: 'none',
    fontSize: 12,
    padding: '6px 20px',
    fontFamily: 'Gilroy, sans-serif',
    fontWeight: 'bold',
    background: theme.palette.secondary.main, 
    '&:hover': {
      background: theme.palette.secondary.main
    }
  },
  mobileBtn: {
    fontSize: 30,
    color: theme.palette.text.primary,
    minWidth: 0,
    '&:hover': {
      cursor: 'pointer'
    },
  },
  modalMenu: {
    display: 'flex',
    alignItems: 'space-between',
    justifyContent: 'flex-start',
    background: '#fff',
    width: '100vw'
  },
  fade: {
    background: '#fff'
  },
  paperMenu: {
    // height: '100vh',
    width: '100vw',
    backgroundColor: "#fff",
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modalSearch: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '100%'
  },
  paperSearch: {
    width: '100vw',
    paddingBottom: '20px',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  mobileSearch: {
    textAlign: 'center',
  },
  closeBtn: {
    color: '#2E3A59',
    fontWeight: 'bold',
    fontSize: 30
  },
  searchIcon: {
    width: 19
  }
}))


export const Header = () => {
  const styles = useStyles()
  const [openMenu, setOpenMenu] = useState(false)
  const [openSearch, setOpenSearch] = useState(false)
  const [query, setQuery] = useState("")
  const router = useRouter()
  const searchInputRef = useRef()
  const { t } = useTranslation("common")

  const onSearchChange = query => setQuery(query)
  const handleMenuOpen    = () => setOpenMenu(true)
  const handleMenuClose   = () => setOpenMenu(false)
  const handleSearchClose = () => setOpenSearch(false)

  const handleSearch = event => {
    event.preventDefault()
    query && router.push(`/search/${query}`)
    setQuery("")
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={0} style={{ background: "#f9f9f9" }}>
        <Toolbar>
          <Grid container>
            <Grid item xs={3}>
              <Button
                onClick={() => router.push("/")}
                className={styles.brandLink}
                disableElevation
                variant="contained"
                color="primary"
                size="small"
                edge="start"
                sx={{ mr: 2 }}
              >{t('header.brandBtn')}
              </Button>
            </Grid>
            <Grid item xs={9} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <SectionTitle title={t('header.brandPhrase')} />
                  <div className={styles.search}>
                    <form onSubmit={handleSearch}>
                    <TextField 
                      fullWidth
                      variant="outlined"
                      placeholder={t('header.searchPlaceholder')}
                      inputProps={{ 
                        style: { 
                          margin: '0 2px', 
                          color: 'red',
                          fontSize: 12, 
                          padding: '10px 0', 
                          width: '300px', 
                          fontFamily: 'Gilroy',
                          fontWeight: 400, 
                          lineHeight: '1.5px', 
                          color: '#000000',
                          borderRadius: '8px', 
                          backgroundColor: '#FFFFFF',
                          '&::placeholder': {
                            color: '#B3B3B3'
                          }
                        } 
                      }}
                      onChange={e => onSearchChange(e.target.value)}
                      value={query}
                      ref={searchInputRef}
                      InputProps={{
                        className: styles.searchInput,
                        classes: { 
                          notchedOutline:styles.noBorder
                        },
                        startAdornment: (
                          <InputAdornment style={{ margin: '0 5px 0 10px', padding: 0 }} position="start">
                            <Image src={searchIcon} className={styles.searchIcon} />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <Button 
                              type="submit"
                              id="search-menu-button" 
                              variant="contained" 
                              color="secondary" 
                              style={{
                                width: 60,
                                borderRadius: 8,
                                textTransform: 'none',
                                fontSize: 12,
                                padding: '6px 20px',
                                fontFamily: 'Gilroy, sans-serif',
                                fontWeight: 'bold',
                                // marginRight: -12,
                                '&:hover': {
                                  color: 'yellow'
                                }
                              }}
                              className={styles.searchBtn}
                              
                              disableElevation
                              >{t('header.searchBtn')}
                            </Button>
                          </InputAdornment>
                        )
                      }}
                    />
                    </form>
                  </div>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  )
}