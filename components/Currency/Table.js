import { useState } from "react"
import { useTable, useFilters, useSortBy } from "react-table"
import { makeStyles, styled } from "@material-ui/styles"
import searchIcon from '../../files/images/UI/search.png'
import { Typography, Table, TableHead, TableBody, TableRow, TableCell, Box, Tabs, Tab, TextField, TableContainer, InputAdornment, Paper } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  main: {
    padding: '10px 20px 0px 20px',
    background: '#fff',
    boxShadow: '0px 8px 25px rgba(83, 89, 144, 0.07)',
    borderRadius: 6,
    marginBottom: 30
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
    lineHeight: '150%'
  },
  tableBoldText: {
    lineHeight: '150%',
    fontSize: 12, 
    fontFamily: 'Gilroy, sans-serif', 
    fontWeight: 'bold'
  },
  tableHeadRow: {
    fontSize: 14,
    lineHeight: '150%',
    margin: '5px 0'
  },
  tableHeadCell: {
    padding: 0,
  },
  tableHeadCellRight: {
    textAlign: 'right'
  },
  tableBodyCell: {
    padding: '10px 0', 
    minWidth: 20,
    borderBottom: 'none'
  },
  rateSlash: {
    color: '#B8B8B8'
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
    background: '#F3F3F3',
    color: 'red',
    border: '1px solid #fff',
  },
  searchIcon: {
    width: 19
  },
  noBorder: {
    border: 'none'
  },
  tabelCell: {
    fontSize: 12, 
    borderBottom: 'none', 
    fontFamily: 'Gilroy, sans-serif', 
    fontWeight: 'bold', 
    padding: '10px 0'
  }
}))

export default function TableComponent({ columns, data }) {
  const styles = useStyles()
  // Use the state and functions returned from useTable to build your UI
  // Create a state
  const [filterInput, setFilterInput] = useState("")
  const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, setFilter } = useTable({columns, data}, useFilters, useSortBy)

  const handleFilterChange = e => {
    const value = e.target.value || undefined
    setFilter("title_ua", value)
    setFilterInput(value)
  }

  const searchInput = <div className={styles.search}>
    <TextField 
      variant="outlined"
      value={filterInput}
      fullWidth
      onChange={handleFilterChange}
      placeholder="Пошук за назвою" 
      inputProps={{ 
        style: { 
          margin: '0 2px', 
          color: 'red',
          fontSize: 12, 
          padding: '10px 0', 
          // width: '300px', 
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
    
  // Render the UI for your table
  return <>
    { searchInput }
    <TableContainer style={{ width: '100%' }}>
      <Table {...getTableProps()} className="currencies">
        <TableHead>
          {/* <TableRow>
            <TableCell>
              <Typography>У касах банків</Typography>
            </TableCell>
            <TableCell>
              <Typography>У касах банків</Typography>
            </TableCell>
            <TableCell>
              <Typography>У касах банків</Typography>
            </TableCell>
          </TableRow> */}
          {headerGroups.map(headerGroup => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <TableCell
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  style={{ fontSize: 11, fontWeight: 'bold', fontFamily: 'Gilroy, sans-serif' }}
                  className={column.isSorted && (column.isSortedDesc ? "sort-desc" : "sort-asc")}
                  // className={column.isSorted && (column.isSortedDesc ? "sort-desc" : "sort-asc")}
                >
                  {column.render("Header")}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <TableCell {...cell.getCellProps()} className={styles.tabelCell}>{cell.render("Cell")}</TableCell>
                  )
                })}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  </>
}