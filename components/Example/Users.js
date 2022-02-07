import { Typography } from "@mui/material"

const Users = (props) => {
  const {users} = props
  return (
    <div>
      {users.map(item => (
        <div key={item.id} style={{ padding: 20, margin: '10px 0', border: '2px solid lightGreen', borderRadius: 5 }}>
          <h3>{item.name}</h3>
          <Typography component="p">{item.email}</Typography>
        </div>
      ))}
    </div>
  )
}

export default Users