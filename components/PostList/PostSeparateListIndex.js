import moment from 'moment'
import { Link, useRouteMatch, useHistory } from "react-router-dom"
import { makeStyles, Accordion, AccordionSummary, AccordionDetails, useMediaQuery, useTheme, IconButton } from "@material-ui/core"
import { ExpandLess, ExpandMore } from "@material-ui/icons"
import { Trans, useTranslation } from 'react-i18next'

const useStyles = makeStyles(theme => ({
  main: {
    background: '#FFFFFF',
    boxShadow: '0px 8px 25px rgba(83, 89, 144, 0.07)',
    borderRadius: 5,
    padding: '0 5px'
  },
  accordionSummary: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  blockSummary: {
    paddingTop: '15px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 15
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    color: theme.palette.text.primary,
    alignItems: 'center'
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
  expandText: {
    fontFamily: 'Gilroy, sans-serif',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: 12,
    lineHeight: '150%'
  },
  content: {
    textAlign: 'left',
    color: theme.palette.text.primary
  },
  expandDiv: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 16,
    '&:hover': {
      cursor: 'pointer'
    }
  },
  icon: {
    color: theme.palette.text.primary,
    margin: 0,
    padding: 0
  },
  dateBadgeKeeper: {
    '&:last-child': {
      display: 'none'
    }
  },
  dateBadge: {
    color: '#B8B8B8',
    fontFamily: 'Gilroy, sans-serif',
    marginRight: 10,
    lineHeight: '150%'
  },
  titleBadge: {
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontSize: 14,
    lineHeight: '150%',
    color: theme.palette.text.primary,
    textDecoration: 'none',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  tabPanel: { 
    display: 'flex', 
    flexDirection: 'row', 
    alignItems: 'space-between' 
  },
  linkHolder: {
    textAlign: 'left',
    color: theme.palette.text.secondary,
    fontFamily: 'Gilroy, sans-serif',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '150%',
    borderBottom: '2px',
    borderBottomStyle: 'solid',
    borderBottomWidth: '2px',
    borderBottomLeftRadius: '2px',
    borderBottomRightRadius: '2px',
    '&:hover': {
      cursor: 'pointer'
    }
  },
}))


export const PostSeparateListIndex = props => {
  const { items, label, toggleShowMore, expanded, toggleExpanded, showMore, currenciesList } = props
  const styles = useStyles()
  const theme = useTheme()
  const {t} = useTranslation()
  const history = useHistory()
  const isSM = useMediaQuery(theme.breakpoints.down('sm'))
  const match = useRouteMatch()
  const labelOfEditorChoice = label === "Вибір редакції" || label === "Editor choice"
  const labelMainNews = label === "Головне" || label === "Main news"
  const labelNewsList = label === "Новини" || label === "News"
  const labelReadMore = label === "Читайте також" || label === "Read more"
  const labelCurrenciesRate = label === "Курс валют на сьогодні" || label === "Exchange rate for today"

  const rows = <div className={styles.content}>
    { items.map(item => (
      <div 
        className={`${styles.contentRow} content-row`} 
        key={item._id} 
        style={{ 
          display: 'flex', 
          flexDirection: (labelOfEditorChoice || labelNewsList) ? 'column-reverse' : 'row',
          paddingBottom: 10
        }}>
        <div 
          className={`${styles.dateBadgeKeeper} date-keeper`} 
          style={{ 
            borderBottom:  (labelOfEditorChoice || labelCurrenciesRate || labelNewsList) ? '1px solid #E9E9E9': 'none'
          }}>
          <span 
            className={styles.dateBadge} 
            style={{ 
              width: '100%',
              display: (labelOfEditorChoice) ? "none" : 'inline-block', 
              fontSize: 12
            }}>
            {moment.utc(item.createdAt).local().format('DD.MM')}</span>
          <span 
            className={styles.dateBadge} 
            style={{ 
              display: labelOfEditorChoice ? "inline-block" : 'none' ,
              fontSize: 10,
              paddingBottom: 7
            }}>
            {moment.utc(item.createdAt).local().format('DD.MM HH:mm')}
          </span>
        </div>
        <div className={styles.titleLinkKeeper}>
          <span className={styles.linkToPostHolder}>
            <Link to={`/${item.slug}`} className={styles.titleBadge}>{item.title}</Link>
          </span>
        </div>
      </div>
    )) }
  </div> 

  console.log(match)

  return <div 
      className={styles.main}
      style={{ 
        margin: 
          isSM 
          ? 
          ((labelOfEditorChoice) ? '-30px 0 30px 0' : (labelCurrenciesRate ? '-30px 0 60px 0' : '30px 0 30px 0')) 
          : 
          (labelReadMore ? '30px 0' : ((labelMainNews) ? '0 0 30px 0' : '0 0 30px 0')),
        // display: (labelCurrenciesRate && path) ? 'block' : 'none'
      }}
    >
    <Accordion 
      defaultExpanded
      elevation={0}
      className={styles.accordion}
      style={{ paddingBottom: expanded ? 20 : 0 }}
    >
      { !(labelOfEditorChoice || labelCurrenciesRate || labelNewsList) 
      ?
      <AccordionSummary
        aria-controls="panel1c-content"
        id="panel1c-header"
        aria-label="Collapse"
        onClick={toggleExpanded}
        style={{ display: 'flex', justifyContent: 'space-between' }}
        IconButtonProps={{ style: { padding: 0, marginRight: 0 } }}
        expandIcon={
          <ExpandMore 
            className={styles.icon} 
            style={{ 
              display: (labelOfEditorChoice || labelCurrenciesRate) && 'none',
              marginRight: 0
            }} 
          />
        }
      >
        <div className={styles.accordionSummary}>
          <div className={styles.row}>
            <span className={styles.unicodeRound}>&#11044;</span>
            <span className={styles.label}>{label}</span> 
          </div>
            <span className={styles.expandText}>
              { expanded ? <>{t("separateList.accordionCollapse")}</> : <>{t("separateList.accordionExpand")}</> }
            </span>
        </div>
      </AccordionSummary>
      :
      <div>
        {<div className={styles.blockSummary}>
          <div className={styles.row}>
            <span className={styles.unicodeRound}>&#11044;</span>
            <span className={styles.label}>{label}</span> 
          </div>
        </div>}
      </div>
      }
      <AccordionDetails>
        { !labelCurrenciesRate ? rows : currenciesList }
      </AccordionDetails> 
      <div onClick={toggleShowMore}
        className={styles.expandDiv}
        style={{ display: (labelOfEditorChoice || labelCurrenciesRate || labelNewsList) && 'none', textTransform: 'none' }}
      >
        <span className={styles.label}>{ showMore 
        ? <>{t("separateList.accordionShowMore")}</> 
        : <>{(t("separateList.accordionCollapse")).toLowerCase()}</> }
        </span>
        <IconButton className={styles.icon}>{ showMore ? <ExpandMore /> : <ExpandLess /> }</IconButton>
      </div>
      <div style={{ paddingBottom: 20, marginLeft: 15, textAlign: 'left' }}>
        <div 
          className={styles.linkHolder} 
          style={{ display: !labelCurrenciesRate ? 'none' : 'inline-block'}}
          onClick={() => history.push('/currencies/25.07.21')}
        ><span>{t("separateList.allCurrenciesLink")}</span>
        </div>
      </div>
    </Accordion>
  </div>
}