import Posts from './Posts'
import Comments from './Comments'
import Users from './Users'
import { Typography } from '@mui/material'

export default function Component(props) {
  const {users, posts, comments, albums} = props

  return (
    <div>
      Users -> Component -> Content -> index <br /> 
      endpoint: https://jsonplaceholder.typicode.com/users
      <Users users={users} />
      Posts -> Component -> Content-> index <br /> 
      endpoint: https://jsonplaceholder.typicode.com/posts
      <Posts posts={posts} />
      Comments -> Component -> Content-> index <br /> 
      endpoint: https://jsonplaceholder.typicode.com/comments
      <Comments comments={comments} />
    </div>
  )
}
