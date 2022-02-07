import { Typography } from '@mui/material'

const Posts = (props) => {
  const {posts} = props
  return (
    <div>
      {posts.map(item => (
        <div key={item.id} style={{ padding: 20, margin: '10px 0', border: '2px solid yellow', borderRadius: 5 }}>
          <h3>{item.title}</h3>
          <Typography component="p">{item.body}</Typography>
        </div>
      ))}
    </div>
  )
}

export default Posts