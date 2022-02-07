export default function ContactsIndex({ contacts }) {
  return (
    <div>
      {contacts.data.map(item => (
        <div key={item._id} style={{ padding: 20, margin: '10px 0', border: '2px solid silver', borderRadius: 5 }}>
          <h3>
            <a style={{ color: "#fff" }} href={item.link} target="_blank">{item.title_en}</a>
          </h3>
        </div>
      ))}
    </div>
  )
}