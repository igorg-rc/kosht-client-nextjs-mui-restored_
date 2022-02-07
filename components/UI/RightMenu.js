import { Typography, Tabs, Tab, Table, TableHead, TableCell, TableBody, TableRow, Box } from "@material-ui/core"
import { makeStyles,styled } from "@material-ui/styles"
import { useEffect, useState } from "react"
import { currenciesGeneralList } from "../../files/data/mocData"
import { get_list_by_slug, get_posts } from "../../api/api"
import { PostSeparateListIndex } from "../PostList/PostSeparateListIndex"
import { useRouteMatch } from "react-router"
import { useTranslation } from "react-i18next"

const useStyles = makeStyles(theme => ({
  main: {
    background: '#FFFFFF',
    minHeight: '10vh',
    boxShadow: '0px 8px 25px rgba(83, 89, 144, 0.07)',
    borderRadius: '6px',
    padding: '10px 0',
    '&:hover': {
      cursor: 'pointer'
    },
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Play, sans-serif',
    fontWeight: 800,
    paddingBottom: 5
  },
  currenciesList: {
    textAlign: 'left',
    padding: '0',
    margin: '0 0 0 10px',
    fontSize: 14,
    fontFamily: 'Play, sans-serif'
  },
  linkToCurrencies: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    margin: '0 0 0 10px',
    fontSize: 14,
    paddingTop: 3,
    '&:hover': {
      cursor: 'pointer'
    }
  },
  linkText: {
    fontWeight: 600,
    fontFamily: 'Play, sans-serif',
    '&:hover': {
      textDecoration: 'underline'
    },
    postTitleDiv: {
      border: '1px solid rgb(0,0,0, 0.15)',
      background: 'red',
      backgroundColor: 'darkgreen', 
      margin: 0, 
      padding: 0
    },
  },
  arrowIcon: {
    fontSize: 17
  },
  tableRegularText: {
    fontSize: 12,
    fontWeight: 'normal',
    fontFamily: 'Roboto, sans-serif'
  },
  tableBoldText: {
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'Gilroy, sans-serif'
  },
  tableHeadRow: {
  },
  tableHeadCell: {
    padding: 0,
  },
  tableHeadCellRight: {
    textAlign: 'right',
  },
  tableBodyCell: {
    padding: 0, 
    minWidth: 20,
    borderBottom: 'none'
  },
  tabPanel: {
    marginLeft: 0,
    margin: '0 0px',
    minWidth: '245px' 
  },
  tableRowText: {
    fontSize: 11,
    margin: '5px 0'
  }
}))


const TabPanel = ({ children, tab, index, ...other }) => {
  const styles = useStyles()
  return <div 
    id={`simple-tabpanel-${index}`} 
    role="tabpanel" 
    hidden={tab !== index} 
    aria-labelledby={`simple-tab-${index}`} 
    {...other} 
    className={styles.tabPanel}
    >
    {tab === index && (<Box sx={{ p: 3 }}><Typography>{children}</Typography></Box>)}
  </div>
}

const StyledTabs = styled(Tabs)({
  '& .MuiTabs-indicator': { backgroundColor: '#5669FF' },
  '& .MuiTabs': { width: 30 }
})

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: 'none',
    fontFamily: 'Gilroy, sand-serif',
    fontSize: 14,
    fontWeight: 'normal',
    lineHeight: '150%',
    marginRight: theme.spacing(0),
    minWidth: 50,
    width: 50,
    color: '#2E3A59',
    opacity: 1,
    left: 0,
    marginLeft: -7,
    marginRight: 9,
    marginTop: -10,
    paddingBottom: -20,
    '&.Mui-selected': {
      color: '#5669FF',
      borderBottom: 'none',
      fontWeight: 600,
    },
    '&.MuiTabs-indicator': {
      color: 'red',
    },
    '&.Mui-focusVisible': {
      backgroundColor: 'rgba(100, 95, 228, 0.32)',
    },
  }),
);

export const RightMenu = ({ path }) => {
  const styles = useStyles()
  const [currencies, setCurrencies] = useState([])
  const [currenciesTitle, setCurrenciesTitle] = useState("")
  const [articles, setArticles] = useState([])
  const [sectionTitle, setSectionTitle] = useState("")
  const [news, setNews] = useState([])
  const [newsTitle, setNewsTitle] = useState("")
  const [loading, setLoading] = useState(false)
  const [tab, setTab] = useState(0)
  const match = useRouteMatch()
  const {t} = useTranslation()
  const localeUA = localStorage.getItem('locale') === 'ua'
  const localeEN = localStorage.getItem('locale') === 'en'

  const handleChange = (event, newValue) => setTab(newValue)
  
  useEffect(() => {
    const setContent = async () => {
      setLoading(true)
      setCurrencies(currenciesGeneralList.banks)
      setCurrenciesTitle(t("separateList.titleCurrenciesToday"))
      const newsList = await get_posts()
      setNews(newsList)
      setNewsTitle(t("separateList.titleNews"))
      const fetchedList = await get_list_by_slug('editor-choice')
      setArticles(fetchedList.posts)
      setSectionTitle(t("separateList.titleEditorChoice"))
      setLoading(false)
    }
    setContent()
  }, [t])

  console.log(match.path)

  const currenciesList = <div id="euro-tab-table_general">
    <>
      <StyledTabs value={tab} onChange={handleChange} aria-label="basic tabs example">
        <StyledTab label={t("separateList.currencyEuro")} />
        <StyledTab label={t("separateList.currencyUSD")} />
      </StyledTabs>
    </>
    <TabPanel tab={tab} index={0} className={styles.tabPanel}>
      <Table className="currencies-bage">
        <TableHead>
          <TableRow className={styles.tableHeadRow}>
            <TableCell className={styles.tableHeadCell}>
              <Typography className={[styles.tableRowText, styles.tableBoldText].concat(" ")}>
                {t("separateList.currencyBank")}
              </Typography>
            </TableCell>
            <TableCell className={styles.tableHeadCell}>
              <Typography className={[styles.tableRowText, styles.tableBoldText, styles.tableHeadCellRight].concat(" ")}>
              {t("separateList.currencyBuy")}
              </Typography>
            </TableCell>
            <TableCell className={styles.tableHeadCell}>
              <Typography className={[styles.tableRowText, styles.tableBoldText, styles.tableHeadCellRight].concat(" ")}>
              {t("separateList.currencySelling")}
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {currencies.map((item, index) => (
          <TableRow key={index}>
            <TableCell className={styles.tableBodyCell}>
              <Typography className={[styles.tableRowText, styles.tableRegularText].concat(" ")}>
                {localeUA ? item.bank_title_ua : (localeEN ? item.bank_title_en : item.bank_title_ua )}
              </Typography>
            </TableCell>
            <TableCell className={[styles.tableBodyCell, styles.tableHeadCellRight].concat(" ")}>
              <Typography className={[styles.tableRowText, styles.tableBoldText].concat(" ")}>{(item.usd_byeRate).toFixed(2)}</Typography>
            </TableCell>
            <TableCell className={[styles.tableBodyCell, styles.tableHeadCellRight].concat(" ")}>
              <Typography className={[styles.tableRowText, styles.tableBoldText].concat(" ")}>{(item.usd_sellRate).toFixed(2)}</Typography>
            </TableCell>
          </TableRow>
          ))}
          
        </TableBody>
      </Table>
    </TabPanel>
    <TabPanel tab={tab} index={1} className={styles.tabPanel}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={styles.tableHeadCell}>
              <Typography className={[styles.tableRowText, styles.tableBoldText].concat(" ")}>
              {t("separateList.currencyBank")}
              </Typography>
            </TableCell>
            <TableCell className={styles.tableHeadCell}>
              <Typography className={[styles.tableRowText, styles.tableBoldText, styles.tableHeadCellRight].concat(" ")}>
              {t("separateList.currencyBuy")}
              </Typography>
            </TableCell>
            <TableCell className={styles.tableHeadCell}>
              <Typography className={[styles.tableRowText, styles.tableBoldText, styles.tableHeadCellRight].concat(" ")}>
              {t("separateList.currencySelling")}
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {currencies.map((item, index) => (
          <TableRow key={index}>
            <TableCell className={styles.tableBodyCell}>
              <Typography className={[styles.tableRowText, styles.tableRegularText].concat(" ")}>
              {localeUA ? item.bank_title_ua : (localeEN ? item.bank_title_en : item.bank_title_ua)}
              </Typography>
            </TableCell>
            <TableCell className={styles.tableBodyCell}>
              <Typography className={[styles.tableRowText, styles.tableBoldText, styles.tableHeadCellRight].concat(" ")}>{(item.euro_byeRate).toFixed(2)}</Typography>
            </TableCell>
            <TableCell className={styles.tableBodyCell}>
              <Typography className={[styles.tableRowText, styles.tableBoldText, styles.tableHeadCellRight].concat(" ")}>{(item.euro_sellRate).toFixed(2)}</Typography>
            </TableCell>
          </TableRow>
          ))}
        </TableBody>
      </Table>
    </TabPanel>
  </div> 

  return loading ? null : <> 
    <PostSeparateListIndex 
      label={currenciesTitle} 
      items={currencies} 
      currenciesList={currenciesList}
    />
    <PostSeparateListIndex 
      label={newsTitle} 
      items={news} 
    />
    <PostSeparateListIndex 
      label={sectionTitle} 
      items={articles} 
    /> 
  </>
}