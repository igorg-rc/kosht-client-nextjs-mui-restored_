import { makeStyles } from "@mui/styles"
import Link from "next/link"
import { Item } from "../UI/UIUnits"
import moment from "moment"

const rightMenuListStyles = makeStyles(theme => ({
  main: {
    background: '#FFFFFF',
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
    <div className={styles.main}>
      <div>
        <span className={styles.unicodeRound}>&#11044;</span>
        <span className={styles.label}>{label}</span> 
      </div>
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
  </Item>
}