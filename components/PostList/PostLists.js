import { makeStyles } from "@mui/styles"
import Link from "next/link"
import { Item } from "../UI/UIUnits"
import moment from "moment"
import { Accordion, AccordionDetails, AccordionSummary, IconButton } from "@mui/material"
import { ExpandLess, ExpandMore } from "@mui/icons-material"
import { useTranslation } from "next-i18next"

const rightMenuListStyles = makeStyles(theme => ({
  main: {
    boxShadow: '0px 8px 25px rgba(83, 89, 144, 0.07)',
    borderRadius: 5,
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    color: theme.palette.text.primary,
    alignItems: 'center'
  },
  contentRow: {
    display: 'flex', 
    flexDirection: 'column-reverse',
    marginBottom: 10
  },
  unicodeRound: {
    color: theme.palette.text.secondary,
    fontSize: 8,
    marginRight: 8,
    verticalAlign: 'middle'
  },
  label: {
    fontWeight: 'bold',
    color: theme.palette.text.primary
  },
  dateBadge: {
    color: '#B8B8B8',
    fontFamily: 'Gilroy, sans-serif',
    marginRight: 10,
    fontSize: 10
  },
  titleBadge: {
    marginTop: 6,
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 500,
    fontStyle: 'normal',
    fontSize: 14,
    lineHeight: '150%',
    color: theme.palette.text.primary,
    textDecoration: 'none',
    '&:hover': {
      cursor: 'pointer'
    }
  },
}))


export const RightMenuPostList = ({items, label}) => {
  const styles = rightMenuListStyles()

  return <Item>
    <div style={{ padding: '10px 0' }}>
    <div>
      <span className={styles.unicodeRound}>&#11044;</span>
      <span className={styles.label}>{label}</span> 
    </div>
    {items ? items.map(item => (
      <div key={item._id} className={`${styles.content} content-row`}>
        <div className={`${styles.contentRow} content-row`}>
        <span className={styles.dateBadge}>
          {moment.utc(item.createdAt).local().format('DD.MM HH:mm')}
        </span>
        <Link href={`/${item.slug}`}>
          <span className={styles.titleBadge}>
            {item.title}
          </span>
        </Link>
        </div>
      </div>
    )) : null}
    </div>
  </Item>
  
}


export const ContentPostList = props => {
  const styles = rightMenuListStyles()
  const { t } = useTranslation("common")
  const {
    items, 
    label, 
    expanded, 
    toggleExpanded,
    showMore,
    toggleShowMore
  } = props

  return <Item>
    {items.map(i => (
      <div key={i._id} className={styles.main}>
        <Accordion
          defaultExpanded
          elevation={0}
          className={styles.accordion}
          style={{ paddingBottom: expanded ? 20 : 0 }}
        >
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
                style={{ marginRight: 0}} 
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
          <AccordionDetails>
          <div className={styles.content}>
            { items ? items.map(item => (
              <div 
                className={`${styles.contentRow} content-row`} 
                key={item._id} 
                style={{ 
                  display: 'flex', 
                  flexDirection: 'row',
                  marginBottom: 10
                }}>
                <div>
                  <span 
                    className={styles.dateBadge} 
                    style={{ 
                      width: '100%',
                      fontSize: 12
                    }}>
                    {moment.utc(item.createdAt).local().format('DD.MM')}</span>
                </div>
                <div className={styles.titleLinkKeeper}>
                  <span className={styles.linkToPostHolder}>
                    <Link href={`/${item.slug}`}>
                      <span className={styles.titleBadge}>{item.title}</span>
                    </Link>
                  </span>
                </div>
              </div>
              )) : "There are no items" }
            </div> 
          </AccordionDetails> 
          <div onClick={toggleShowMore} className={styles.expandDiv}>
            <span className={styles.label}>
            { showMore ?
            <>{t("separateList.accordionShowMore")}</> :
            <>{(t("separateList.accordionCollapse")).toLowerCase()}</> }
            </span>
            <IconButton className={styles.icon}>{ showMore ? <ExpandMore /> : <ExpandLess /> }</IconButton>
          </div>
          <div style={{ paddingBottom: 20, marginLeft: 15, textAlign: 'left' }}>
            <div 
              className={styles.linkHolder} 
              onClick={() => router.replace('/currencies')}
            ><span>{t("separateList.allCurrenciesLink")}</span>
            </div>
            <div 
              className={styles.linkHolder} 
              onClick={() => router.replace('/')}
            ><span>{t("separateList.titleAllNews")}</span>
            </div>
          </div>
          {/* <Link href={i.slug}>{i.title}</Link> */}
        </Accordion>
      </div>
    ))}
  </Item>
}