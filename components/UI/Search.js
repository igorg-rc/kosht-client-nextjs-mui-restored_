import { TextField } from "@material-ui/core"
import { useState } from "react"

export const Search = () => {
  const [text, setText] = useState("")

  return <>
    <TextField
      fullWidth
      value={text}
      onChange={e => setText(e.target.value)}
      placeholder="Search"
    />
  </>
}