import axios from 'axios'
//==================== API_LINK =========================//
//--------------- production environment ----------------//
export const HOST_URL = 'https://kosht-api.herokuapp.com' 
//------------ development environment ------------------// 
// export const HOST_URL = 'http://localhost:5000'
//================== END API_LINK =======================//

const API_URL = `${HOST_URL}/api`
const POSTS_URL = `${API_URL}/posts`
const READ_MORE_URL = `${API_URL}/posts/readmore`
const TAGS_URL = `${API_URL}/tags`
const CONTACTS_URL = `${API_URL}/contacts`
const CATEGORIES_URL = `${API_URL}/categories`
const POSTS_BY_TAGS_URL = `${API_URL}/posts/tags`
const POSTS_BY_CATEGORY_URL = `${API_URL}/posts/categories`
const LISTS_URL = `${API_URL}/lists`
const USERS_URL = `${API_URL}/users`
const BANNERS_URL = `${API_URL}/banners`

// Get all posts
export const get_posts = () => axios.get(POSTS_URL)
  .then(res => res.data)
  .catch(error => console.log(error))

// Get post by id
export const get_post_by_id = id => axios.get(`${POSTS_URL}/id/${id}`)
  .then(res => res.data)
  .catch(error => console.log(error))

// Get post by slug
export const get_post_by_slug = slug => axios.get(`${POSTS_URL}/slug/${slug}`)
.then(res => res.data)
.catch(error => console.log(error))

// Get all tags
export const get_tags = () => axios.get(TAGS_URL)
  .then(res => res.data)
  .catch(error => console.log(error))

// Get all categories
export const get_categories = () => axios.get(CATEGORIES_URL)
  .then(res => res.data)
  .catch(error => console.log(error))

// Get all lists
export const get_lists = () => axios.get(LISTS_URL)
  .then(res => res.data)
  .catch(error => console.log(error))

export const get_list_by_id = id => axios.get(`${LISTS_URL}/id/${id}`)
  .then(res => res.data)
  .catch(error => console.log(error))

export const get_list_by_slug = slug => axios.get(`${LISTS_URL}/slug/${slug}`)
  .then(res => res.data)
  .catch(error => console.log(error))

// Get posts by tag 
export const get_posts_by_tag = tag => axios.get(`${POSTS_BY_TAGS_URL}/${tag}`)
  .then(res => res.data)
  .catch(error => console.log(error))


// Get posts by category 
export const get_posts_by_category = category => axios.get(`${POSTS_BY_CATEGORY_URL}/${category}`)
  .then(res => res.data)
  .catch(error => console.log(error))


// contacts API actions
export const get_contacts = () => axios.get(CONTACTS_URL)
  .then(res => res.data)
  .catch(error => console.log(error))

export const get_contact_by_id = id => axios.get(`${CONTACTS_URL}/${id}`)
  .then(res => res.data)
  .catch(error => console.log(error))

export const create_contact = contact => axios.post(CONTACTS_URL, contact)
  .then(contact => console.log("New contact was successfuly created", contact))
  .catch(error => console.log(error))

export const edit_contact = (contact, id) => axios.patch(`${CONTACTS_URL}/${id}`, contact)
  .then(contact => console.log(`Contact was successfuly updated: ${contact}`))
  .catch(error => console.log(error))

export const delete_contact = id => axios.delete(`${CONTACTS_URL}/${id}`)
  .then(res => console.log(`Contact with id ${id} was successfuly deleted.`))
  .catch(error => console.log(error))

export const delete_all_contacts = () => axios.delete(CONTACTS_URL)
  .then(res => console.log(`All contacts were successfuly deleted.`))
  .catch(error => console.log(error))

// Get posts from specific lists 
// Get "read more" posts (current version - 5 latest posts)
export const get_readmore_posts = slug => axios.get(`${READ_MORE_URL}/${slug}`)
  .then(res => res.data)
  .catch(error => console.log(error))


// users actions (subscribers for reading posts)
export const get_subscribers = () => axios.get(USERS_URL)
  .then(res => res.data)
  .catch(error => console.log(error))

export const create_subscriber = user => axios.post(USERS_URL, user)
  .then(res => console.log("New user was successfully created!"))
  .catch(error => console.log(error))

export const delete_subscriber = id => axios.delete(`${USERS_URL}/${id}`)
  .then(res => console.log(`All contacts were successfuly deleted.`))
  .catch(error => console.log(error))


// banners API actions
export const get_banners = () => axios.get(BANNERS_URL)
  .then(res => res.data)
  .catch(error => console.log(error))

export const get_visible_banners = () => axios.get(`${BANNERS_URL}/visible`)
  .then(res => res.data)
  .catch(error => console.log(error))

export const click_banner = () => axios.post(`${BANNERS_URL}/visible`)
  .then(res => res.data)
  .catch(error => console.log(error))

export const get_banner_by_id = id => axios.get(`${BANNERS_URL}/${id}`)
  .then(res => res.data)
  .catch(error => console.log(error))

export const create_banner = banner => axios.post(BANNERS_URL, banner)
  .then(banner => console.log("New banner was successfuly created", banner))
  .catch(error => console.log(error))

export const edit_banner = (banner, id) => axios.patch(`${BANNERS_URL}/${id}`, banner)
  .then(banner => console.log(`Banner was successfuly updated: ${banner}`))
  .catch(error => console.log(error))

export const delete_banner = id => axios.delete(`${BANNERS_URL}/${id}`)
  .then(res => console.log(`Banner with id ${id} was successfuly deleted.`))
  .catch(error => console.log(error))
