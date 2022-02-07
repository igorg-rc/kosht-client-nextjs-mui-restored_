import { Typography } from "@mui/material"

const Comments = (props) => {
  const {comments} = props
  return (
    <div>
      {comments.map(item => (
        <div key={item.id} style={{ padding: 20, margin: '10px 0', border: '2px solid lightBlue', borderRadius: 5 }}>
          <h3>{item.email}</h3>
          <Typography component="p">{item.body}</Typography>
        </div>
      ))}
    </div>
  )
}

export default Comments