import { List, ListItemText, TextField, Typography, Container } from "@mui/material";
import { ScaleLoader, BeatLoader } from "react-spinners";
import Link from "next/link";
import { makeStyles, useTheme } from "@mui/styles";
import { useRouter } from "next/router";
import Image from "next/image";

const leftMenuStyles = makeStyles((theme) => ({
  listWrapper: {
  },
  listItem: {
    padding: '5px 0',
    display: 'flex',
    justifyItems: 'center'
  },
  link: {
    color: theme.palette.primary.main,
    width: "100%",
    borderRadius: "5px",
    fontSize: 14,
    fontFamily: "Gilroy, sans-serif",
    fontWeight: 500,
    textDecoration: "none",
    position: "relative",
    "&:hover": {
      color: theme.palette.secondary.light,
    },
  },
  activeLink: {
    color: "red",
  },
  markerWrapper: {
    marginRight: 10,
    fontSize: 12,
  },
}));

const spinnerStyles = makeStyles((theme) => ({
  main: {
    textAlign: "center",
    margin: "0 auto",
  },
  title: {
    color: theme.palette.text.primary,
    fontSize: 16,
    fontFamily: "Gilroy, sans-serif",
  },
  pageTitle: {
    color: theme.palette.text.primary,
    fontSize: 30,
    fontWeight: 700,
    fontFamily: "Gilroy, sans-serif",
  },
}));

const linkForActionStyles = makeStyles(theme => ({
  link: { 
    paddingTop: 12,
    color: theme.palette.text.secondary,
    fontFamily: 'Gilroy, sans-serif',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '150%',
    borderBottom: '2px',
    borderBottomStyle: 'solid',
    '&:hover': {
      cursor: 'pointer'
    }
  }
}))

const subscribeInputStyles = makeStyles(theme => ({
  wrapper: {
    paddingBottom: 20
  },
  noBorder: {
    border: 'none'
  },
  input: {
    padding: '5px 0'
  },
  inputField: {
    margin: 0, 
    fontSize: '12px', 
    fontFamily: 'Gilroy, sans-serif', 
    padding: '8px 18px', 
    background: '#F3F3F3', 
    color: '#B2B2B2', 
    borderRadius: '6px' 
  }
}))


export const MyContainer = ({children}) => {
  const theme = useTheme()
  const lg = theme.breakpoints.up('lg')
  return <Container style={{  maxWidth: lg && 1280 }}>
    {children}
  </Container>
}


export const SpinnerLoadPage = ({ loadingStatus }) => {
  const styles = spinnerStyles();
  return (
    <div className={styles.main}>
      <Typography component="h1" className={styles.pageTitle}>
        Loading...
      </Typography>
      <BeatLoader
        loading={loadingStatus}
        size={15}
        height={50}
        width={5}
        radius={0}
        margin={5}
        color={"#2E3A59"}
      />
    </div>
  );
};

export const SpinnerContent = ({ loading, locale }) => {
  const styles = spinnerStyles();
  return (
    <div className={styles.main}>
      <ScaleLoader
        loading={loading}
        height={50}
        width={5}
        radius={0}
        margin={5}
        color={"#2E3A59"}
      />
      <Typography component="h3" className={styles.title}>
        { loading && locale === "en" ? <>Loading...</> :
          loading && locale === "uk" ? <>Завантаження...</> : null }
      </Typography>
    </div>
  );
};

export const SectionTitle = props => {
  const { title, children, link } = props
  const theme = useTheme();
  return (
    <Typography
      style={{
        lineHeight: "180%",
        textAlign: "left",
        fontSize: 18,
        fontWeight: 800,
        color: theme.palette.text.primary,
        fontFamily: "Gilroy, sans-serif",
      }}
      variant="h1"
      component="h1"
    >
      {link ? children : title}
    </Typography>
  );
};

export const LeftMenuList = (props) => {

  const { items, locale, item } = props;
  const styles = leftMenuStyles();
  const router = useRouter();
  const theme = useTheme();

  return !item ? (
    <div className={styles.listWrapper}>
      <List style={{ padding: 0, margin: 0 }}>
        {items.map(i => (
          <ListItemText key={i._id} className={styles.listItem}>
            {(i.imgUrl) ? <span style={{ verticalAlign: "middle", marginRight: 5 }}>
              <Image 
                src={`http://193.46.199.82:5000/${i.imgUrl}`}
                width="15px" 
                height="15px" 
                // style={{ verticalAlign: 'middle' }} 
              /></span>  : 
              <span className={styles.markerWrapper}>&#9679;</span>}
              
              
            <a href={i.link} target="_blank" className={styles.link}>
              {locale === "en" ? i.title_en : i.title_ua}
            </a>
          </ListItemText>
        ))}
      </List>
    </div>
  ) : (
    <div className={styles.listWrapper}>
      <List>
        {items.map((i) => (
          <ListItemText
            key={i._id}
            className={
              router.asPath.includes(i.slug)
                ? `${styles.listItem} ${styles.activeLink}`
                : styles.listItem
            }
          >
            {item === "tag" && (
              <span
                className={styles.markerWrapper}
                style={{
                  color:
                    router.asPath.includes(i.slug) &&
                    theme.palette.secondary.main,
                }}
              >
                #
              </span>
            )}
            {item === "category" && (i.imgUrl_main && i.imgUrl_hover) ? <span style={{ verticalAlign: "middle", marginRight: 5  }}>
                <Image src={`http://193.46.199.82:5000/${i.imgUrl_main}`} height="20px" width="20px" />
              </span> : null
            }
            {item === "category" && (!i.imgUrl_hover && !i.imgUrl_main) && (
              <span
                style={{
                  color:
                    router.asPath.includes(i.slug) &&
                    theme.palette.secondary.main,
                }}
                className={styles.markerWrapper}
              >
                {" "}
                &#9679;
              </span>
            )}
            <Link href={`/${item}/${i.slug}`}>
              <a
                className={styles.link}
                style={{
                  color:
                    router.asPath.includes(i.slug) &&
                    theme.palette.secondary.main,
                }}
              >
                {locale === "en" ? i.title_en : i.title_ua}
              </a>
            </Link>
          </ListItemText>
        ))}
      </List>
    </div>
  );
};

export const Item = ({ children }) => (
  <div
    style={{
      marginBottom: 10,
      borderRadius: 6,
      boxShadow: "0px 8px 25px rgba(83, 89, 144, 0.07)",
      padding: '0 20px',
    }}
  >
    {children}
  
  </div>
);

export const LinkForAction = ({subscribe, onSubmit}) => {
  const styles = linkForActionStyles()

  return  <div style={{ textAlign: 'left' }} onClick={onSubmit}>
    <span className={styles.link}>
      {subscribe}             
    </span>
  </div>
}

export const SubscribeInput = props => {
  const {placeholder, subscribe, onSubmit, onChange} = props
  const styles = subscribeInputStyles() 

  return <div className={styles.wrapper}>
    <TextField 
      fullWidth
      variant="outlined"
      onChange={onChange}
      placeholder={placeholder}
      className={styles.input}
      inputProps={{ className: styles.inputField }}
      InputProps={{ classes: { notchedOutline: styles.noBorder } }}
    />
    <LinkForAction 
      onSubmit={onSubmit} 
      subscribe={subscribe} 
    />
  </div>
}


export const LangSwitcher = props => {
  const { locales } = props
  const { asPath } = useRouter()
  return <div style={{ padding: '20px 0' }}>
    {locales.map(item => (
      <div key={item}>
        <Link 
          href={item == "uk" ? asPath : `/en${asPath}`}
          locale={item}
        >{item}
        </Link>
      </div>
    ))}
  </div>
}