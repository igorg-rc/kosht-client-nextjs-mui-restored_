import * as React from "react"
import isEmpty from "lodash.isempty"
import Link from "next/link"
import { makeStyles } from "@mui/styles"

const useStyles = makeStyles({
  noUsers: { color: 'red' },
  title: {
    textAlign: 'center',
    marginTop: 0,
    marginBottom: 10
  },
  userList: {
    background: '#ebebeb',
    padding: 20,
    marginBottom: 20,
    border: '1px solid #a8a8a8',
    borderRadius: 5
  }
})



const CategoriesList = ({ error, categories, retrieved }) => {
  const styles = useStyles()

  return <> {!retrieved ? (<p>Loading...</p>) : !isEmpty(categories) ? (
    <div className={styles.userList}>
      <h1 className={styles.title}>Categories List</h1>
      <div className={styles.userList}>
        {categories.map(i => (
          <div className={styles.user} key={i._id}>
            <Link href={`/categories/${i.slug}`}>
              {i.title_en}
            </Link>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className={styles.noUsers}>{error || "Failed to load users list"}</div>
  )}
  </>
}

export default CategoriesList;
