import { Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"

const useStyles = makeStyles(theme => ({
message: {
  color: theme.palette.text.primary,
  fontSize: 18,
  paddingBottom: 10,
  textAlign: 'center'
} }))

export const PageMessage = ({ message }) => {
  const styles = useStyles()
  return <Typography variant="h1" component="h1" className={styles.message}>{ message }</Typography>
}