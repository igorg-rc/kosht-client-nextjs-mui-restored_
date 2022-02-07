import { useEffect, useState, useMemo } from "react"
import { makeStyles } from "@material-ui/styles"
import { Typography, Table, TableHead, TableBody, TableRow, TableCell, TextField, TableContainer, InputAdornment, Button } from "@material-ui/core"
import { exchangeListUA, dataRowsUSD, dataRowsEuro, dataRowsRub, dataRowsPound, dataRowsFrSw, dataRowsZlot, dataRowsCrona, exchangeListEN } from "../../files/data/mocData"
import { Tabs, Tab, Panel } from '@bumaga/tabs' 
import searchIcon from '../../files/images/UI/search.png'
import { SpinnerContent } from "../UI/SpinnerContent"
// import styled from 'styled-components'
import "react-tabs/style/react-tabs.css"
import { useTranslation } from "react-i18next"
import { t } from "i18next"

const useStyles = makeStyles(theme => ({
  main: {
    padding: '20px',
    background: '#fff',
    boxShadow: '0px 8px 25px rgba(83, 89, 144, 0.07)',
    borderRadius: 6,
    marginBottom: 10,
    fontSize: 16
  },
  tabsWrapper: {
    padding: '0px 20px',
    background: '#fff',
    boxShadow: '0px 8px 25px rgba(83, 89, 144, 0.07)',
    borderRadius: 6,
    marginBottom: 20,
    fontSize: 16
  },
  tabBtn: {
    border: 'none',
    background: '#fff',
    fontSize: 14,
    fontFamily: 'Gilroy, sans-serif',
    padding: '10px 0',
    height: 40,
    marginRight: 15,
    // marginTop: 10,
    letterSpacing: '0.5px',
    color: '#2E3A59',
    borderRadius: 0,
    textTransform: 'none',
    '&:hover': {
      cursor: 'pointer',
      color: '#5669FF',
      background: '#fff'
    }
  },
  table: {
    minWidth: 650
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    color: theme.palette.text.primary,
    alignItems: 'center'
  },
  headSummary: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  unicodeRound: {
    color: theme.palette.text.secondary,
    fontSize: 8,
    marginRight: 8
  },
  label: {
    fontWeight: 'bold',
    color: theme.palette.text.primary
  },
  currenciesHeader: {
    textAlign: 'left',
    fontSize: 16,
    fontFamily: 'Play, sans-serif',
    fontWeight: 600
  },
  currenciesValues: {
    textAlign: 'left',
    fontSize: 16,
    fontFamily: 'Play, sans-serif',
    fontWeight: 500
  },
  bankIcon: {
    paddingRight: 30,
    verticalAlign: 'middle'
  },
  tableRegularText: {
    lineHeight: '150%',
    fontWeight: 'normal',
    fontFamily: 'Roboto, sans-serif',
  },
  bankTitle: {
    fontSize: 12, 
    fontFamily: 'Roboto, sans-serif',
    lineHeight: '150%'
  },
  bankRates: {
    fontSize: 12, 
    fontFamily: 'Gilroy, sans-serif',
    fontWeight: 'bold',
    lineHeight: '150%'
  },
  tableBoldText: {
    display: 'block',
    fontFamily: 'Gilroy, sans-serif', 
    fontWeight: 'bold',
    fontSize: 14
  },
  tableHeadRow: {
    fontSize: 14,
    margin: 0,
    padding: 0,
    borderBottom: '1px solid #E9E9E9'
  },
  tableHeadCell: {
    padding: 0,
    margin: 0,
    textAlign: 'right'
  },
  tableHeadCellRight: {
    textAlign: 'right'
  },
  tableBodyCell: {
    padding: '10px 0', 
    minWidth: 20,
    borderBottom: 'none'
  },
  tabPanel: {
    marginLeft: 0,
    margin: 0,
    paddingBottom: 15,
    minWidth: '245px' 
  },
  tableRowText: {
    fontSize: 11,
    margin: '5px 0'
  },
  search: {
    height: '37px',
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
    width: '9.25vw',
    background: '#F3F3F3',
    color: 'red',
    border: '1px solid #fff'
  },
  searchIcon: {
    width: 20
  },
  noBorder: {
    border: 'none'
  },
  sortSpan: {
    // color: '#B8B8B8',
    // fontSize: 12,
    '&:hover': {
      cursor: 'pointer'
    },
    color: '#B8B8B8', 
    fontSize: 10
  }
}))

const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = useState(config);

  const sortedItems = useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

// const Tab = styled.button`
//   padding: 10px 30px;
//   cursor: pointer;
//   opacity: 0.6;
//   background: white;
//   border: 0;
//   outline: 0;
//   border-bottom: 2px solid transparent;
//   transition: ease border-bottom 250ms;
//   ${({ active }) =>
//     active &&
//     `
//     border-bottom: 2px solid black;
//     opacity: 1;
//   `}
// `;

const ProductTable = (props) => {
  const styles = useStyles()
  const { items, requestSort, sortConfig } = useSortableData(props.currencies);
  const { query, onInputChange } = props
  const { t } = useTranslation()
  const localeUA = localStorage.getItem('locale') === 'ua'
  // const localeEN = localStorage.getItem('locale') === 'en'
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };


  return (
  <TableContainer>
    <Table>
      <TableHead className={styles.tableHeadRow}>
        <TableRow>
          <TableCell component="th" rowSpan="2" сlassName={styles.tableHeadCell}>
            <div className={styles.search}>
              <TextField 
                value={query} 
                onChange={onInputChange}
                variant="outlined"
                placeholder={t("currenciesPage.searchInput")} 
                className={styles.searchinput}
                inputProps={{ 
                  style: { 
                    margin: '0 2px', 
                    color: 'red',
                    fontSize: 12, 
                    padding: '10px 0', 
                    fontFamily: 'Gilroy',
                    fontWeight: 400, 
                    lineHeight: '1.5px', 
                    color: '#000000',
                    borderRadius: '8px', 
                    '&::placeholder': {
                      color: '#B3B3B3'
                    }
                  } 
                }}
                InputProps={{
                  className: styles.searchInput,
                  startAdornment: (
                    <InputAdornment style={{ margin: '0 5px 0 5px', padding: 0 }}>
                      <img src={searchIcon} className={styles.searchIcon} />
                    </InputAdornment>
                  ),
                  classes: { 
                    notchedOutline:styles.noBorder
                  }
                }}
              />
            </div>
          </TableCell>
          <TableCell component="th" className={styles.tableHeadCell}>
            <Typography className={[styles.tableBoldText, styles.tableHeadCellRight].concat(" ")}>{t("currenciesPage.atPayDesk")}</Typography>
            <div style={{ textAlign: 'right', marginLeft: 'auto' }}>
              <span onClick={() => requestSort('paydesk_bye')} className={[getClassNamesFor('paydesk_bye'), styles.sortSpan].join(" ")}>
                {t("currenciesPage.currencyBuy")}&nbsp;&#8597;
              </span>
              <span className={styles.sortSpan}>&nbsp;/&nbsp;</span>
              <span onClick={() => requestSort('paydesk_sell')} className={[getClassNamesFor('paydesk_sell'), styles.sortSpan].join(" ")}>
                {t("currenciesPage.currencySelling")}&nbsp;&#8597;
              </span>
            </div>
          </TableCell>
          <TableCell component="th" className={styles.tableHeadCell}>
            <Typography className={[styles.tableBoldText, styles.tableHeadCellRight].concat(" ")}>{t("currenciesPage.atCard")}</Typography>
            <div style={{ textAlign: 'right', marginLeft: 'auto' }}>
              <span onClick={() => requestSort('card_bye')} className={[getClassNamesFor('card_bye'), styles.sortSpan].join(" ")}>
                {t("currenciesPage.currencyBuy")}&nbsp;&#8597;
              </span>
              <span className={styles.sortSpan}>&nbsp;/&nbsp;</span>
              <span onClick={() => requestSort('card_sell')} className={[getClassNamesFor('card_sell'), styles.sortSpan].join(" ")}>
                {t("currenciesPage.currencySelling")}&nbsp;&#8597;
              </span>
            </div>
          </TableCell>
          <TableCell component="th" className={styles.tableHeadCell}>
            <Typography className={[styles.tableBoldText, styles.tableHeadCellRight].concat(" ")}>{t("currenciesPage.atOnline")}</Typography>
            <div style={{ textAlign: 'right', marginLeft: 'auto' }}>
              <span onClick={() => requestSort('online_bye')} className={[getClassNamesFor('online_bye'), styles.sortSpan].join(" ")}>
                {t("currenciesPage.currencyBuy")}&nbsp;&#8597;
              </span>
              <span className={styles.sortSpan}>&nbsp;/&nbsp;</span>
              <span onClick={() => requestSort('online_sell')} className={[getClassNamesFor('online_sell'), styles.sortSpan].join(" ")}>
                {t("currenciesPage.currencySelling")}&nbsp;&#8597;
              </span>
            </div>
          </TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {items
          .filter(row => {
            let requestedField = localeUA ? row.title_ua : row.title_en
            if (query === "") {
              return row
            } else if (requestedField.toLowerCase().includes(query.toLowerCase())) {
              return row
            }
          })
          .map(item => (
            <TableRow key={item.id}>
              <TableCell style={{ textAlign: "left" }}>
                <img src={item.icon} className={styles.bankIcon} />
                <span className={styles.bankTitle}>{localeUA ? item.title_ua : item.title_en}</span>
              </TableCell>
              <TableCell style={{ textAlign: 'right' }}>
                <span className={styles.bankRates}>{(item.paydesk_bye).toFixed(2)}</span>
                <span className={styles.bankRates}>&nbsp;/&nbsp;</span>
                <span className={styles.bankRates}>{(item.paydesk_sell).toFixed(2)}</span>
              </TableCell>
              <TableCell style={{ textAlign: 'right' }}>
                <span className={styles.bankRates}>{(item.card_bye).toFixed(2)}</span>
                <span className={styles.bankRates}>&nbsp;/&nbsp;</span>
                <span className={styles.bankRates}>{(item.card_sell).toFixed(2)}</span>
              </TableCell>
              <TableCell style={{ textAlign: 'right' }}>
                <span className={styles.bankRates}>{(item.online_bye).toFixed(2)}</span>
                <span className={styles.bankRates}>&nbsp;/&nbsp;</span>
                <span className={styles.bankRates}>{(item.online_sell).toFixed(2)}</span>
              </TableCell>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  </TableContainer>
  )
}



export const CurrencyFull = () => {
  const types = !localStorage.getItem('locale') ? exchangeListUA : (localStorage.getItem('locale') === "en" ? exchangeListEN : exchangeListUA )
  
  const { t } = useTranslation()
  const styles = useStyles()
  const [sectionTitle, setSectionTitle] = useState("")
  const [tabList, setTabList] = useState([])
  const [tab, setTab] = useState(0)
  const [active, setActive] = useState(types[0])
  const [rowsEuro, setRowsEuro] = useState([])
  const [rowsUSD, setRowsUSD] = useState([])
  const [rowsRub, setRowsRub] = useState([])
  const [rowsPound, setRowsPound] = useState([])
  const [rowsFrSw, setRowsFrSw] = useState([])
  const [rowsZlot, setRowsZlot] = useState([])
  const [rowsCrona, setRowsCrona] = useState([])
  const [searchedEuro, setSearchedEuro] = useState("")
  const [searchedUSD, setSearchedUSD] = useState("")
  const [searchedRub, setSearchedRub] = useState("")
  const [searchedPound, setSearchedPound] = useState("")
  const [searchedFrSw, setSearchedFrSw] = useState("")
  const [searchedZlot, setSearchedZlot] = useState("")
  const [searchedCrona, setSearchedCrona] = useState("")
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    const setContent = async () => {
      setLoading(true)
      setTimeout(() => {
        setRowsEuro(dataRowsEuro)
        setRowsEuro(dataRowsEuro)
        setRowsUSD(dataRowsUSD)
        setRowsRub(dataRowsRub)
        setRowsPound(dataRowsPound)
        setRowsFrSw(dataRowsFrSw)
        setRowsZlot(dataRowsZlot)
        setRowsCrona(dataRowsCrona)
        setTabList(types)
        setSectionTitle(t("currenciesPage.pageTitle"))
        setLoading(false)
      }, 500)
    }
    setContent()
  }, [dataRowsEuro, t])


  const handleClick = (newType, newIndex) => {
    setActive(newType)
    setTab(newIndex)
  }


  return !loading 
  ? <>
  <div className={styles.main}>
    <div className={styles.headSummary}>
      <div className={styles.row}>
        <span className={styles.unicodeRound}>&#11044;</span>
        <span className={styles.label}>{sectionTitle}</span> 
      </div>
    </div>
    <Tabs>
      <div style={{ textAlign: 'left',  borderRadius: 6, display: 'flex', flexDirection: 'row' }}>
        { tabList.map((type, index) => (
          <div onClick={e => handleClick(type, index)}><Tab tab={tab} key={type} active={active == type} onClick={(type, index) => handleClick(type, index)}>
            <button 
              type="button"
              // key={type}
              onClick={e => alert("clicked")}
              style={{ 
                color: active == type ? '#5669FF' : '#2E3A59',
                // fontWeight: (active && index == activeIndex) ? 600 : 'normal',
                borderBottom: active == type ? '2px solid #5669FF': '2px solid #fff',
                fontWeight: active == type ? 600 : 500,
              }} 
              className={styles.tabBtn}>{type}
            </button>
          </Tab>
          </div>
        ))}
      </div>

      <div style={{ height: '3vh', background: "#F8F8F8", margin: '0 -30px', borderRadius: 10 }}></div>

      <div style={{ borderRadius: 6 }}>
        <Panel><ProductTable currencies={rowsEuro} query={searchedEuro} onInputChange={e => setSearchedEuro(e.target.value)} /></Panel>
        <Panel><ProductTable currencies={rowsUSD} query={searchedUSD} onInputChange={e => setSearchedUSD(e.target.value)} /></Panel>
        <Panel><ProductTable currencies={rowsRub} query={searchedRub} onInputChange={e => setSearchedRub(e.target.value)} /></Panel>
        <Panel><ProductTable currencies={rowsPound} query={searchedPound} onInputChange={e => setSearchedPound(e.target.value)} /></Panel>
        <Panel><ProductTable currencies={rowsFrSw} query={searchedFrSw} onInputChange={e => setSearchedFrSw(e.target.value)} /></Panel>
        <Panel><ProductTable currencies={rowsZlot} query={searchedZlot} onInputChange={e => setSearchedZlot(e.target.value)} /></Panel>
        <Panel><ProductTable currencies={rowsCrona} query={searchedCrona} onInputChange={e => setSearchedCrona(e.target.value)} /></Panel>
      </div>
    </Tabs>
    </div>
          {/* <div>
            {types.map((type) => (
              <Tab
                key={type}
                active={active === type}
                onClick={() => setActive(type)}
              >
                {type}
              </Tab>
            ))}
          </div>
          <p />
          <p> Your payment selection: {active} </p>
      </div> */}
  </> 
  : <SpinnerContent loadingStatus={loading} />
}