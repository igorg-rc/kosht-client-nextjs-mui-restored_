import { useMemo, useState } from "react"

const useSortColumn = (values, config = null) => {
  const [sortConfig, setSortConfig] = useState(config)

  const sortedValues = useMemo(() => {
    let sortableValues = [...values]
    if (sortConfig !== null) {
      sortableValues.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "descending" ? 1 : -1
        }
        return 0
      })
    }
    return sortableValues
  }, [values, sortConfig])

  const requestSort = key => {
    let direction = 'ascending'
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    } 
    setSortConfig({ key, direction })
  }

  return { values: sortedValues, requestSort, sortConfig }
}

export const SimpleTable = props => {
  const { query, headLabels, onInputChange } = props
  const { values, requestSort, sortConfig } = useSortColumn(props.items)
  
  const getClassesFor = name => {
    if (!sortConfig) {
      return
    }
    return sortConfig.key === name ? sortConfig.direction : undefined
  }

  return <>
    <table width='100%'>
      <thead>
        <th>
          <input 
            className="search-input"
            value={query} 
            onChange={onInputChange} 
          />
        </th>
        {headLabels.map(label => (
          <th>
            {label}
            <span 
              className={() => getClassesFor(label)}
              onClick={() => requestSort(label)}
            >
            +
            </span>
          </th>
        ))}
      </thead>
      <tbody>
        {values
          .filter(row => {
            if (query === "") {
              return row
            } else if (row.name.toLowerCase().includes(query.toLowerCase())) {
              return row
            }
          })
          .map((row, index) => (
            <tr key={index}>
              {row.name && <td style={{ fontWeight: 'bold' }}>{row.name}</td>}
              {row.calories && <td>{row.calories}</td>}
              {row.fat && <td>{row.fat}</td>}
              {row.carbs && <td>{row.carbs}</td>}
              {row.protein && <td>{row.protein}</td>}
              {row.coffeine && <td>{row.coffeine}</td>}
 
              {(row.icon && row.name_) && <td style={{ fontWeight: 'bold' }}><img src={row.icon} />{row.name}</td>}
              {row.paydesk_bye && <td>{row.paydesk_bye}</td>}
              {row.paydesk_sell && <td>{row.paydesk_sell}</td>}
              {row.card_bye && <td>{row.card_bye}</td>}
              {row.card_sell && <td>{row.card_bye}</td>}
              {row.card_bye && <td>{row.online_bye}</td>}
              {row.card_sell && <td>{row.online_sell}</td>} 

              {row.one && <td>{row.one}</td>}
              {row.two && <td>{row.two}</td>}
              {row.three && <td>three{row.three}</td>}  
            </tr>
          ))
        }
      </tbody>
    </table>
  </>
}