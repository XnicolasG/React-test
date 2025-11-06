import { useEffect, useState } from 'react'
import './App.css'
import { UsersList } from './components/UsersList'
import { type User } from './types'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sortByCountry, setSortByCountry] = useState(false)

  const toggleColors = () => {
    setShowColors(!showColors)
    console.log(showColors);
  }

  const toggleSortByCountry = () => { setSortByCountry(!sortByCountry) }

  const sortUsers = sortByCountry ?
  // [...users].sort((a, b) => {
  //   return a.location.country.localeCompare(b.location.country)

   users.toSorted((a, b) => {
    return a.location.country.localeCompare(b.location.country)
  }) : users

  const handleDelete = (email: string) => {
    const filterUsers = users.filter((users) => users.email !== email)
    setUsers(filterUsers)
  }

  useEffect(() => {
    fetch('https://randomuser.me/api?results=100')
      .then(res => res.json())
      .then(res => {
        setUsers(res.results)
      })
      .catch(err => {
        console.error(err);

      })
  }, [])

  return (
    <div>
      <h1>react test</h1>
      <header>
        <button onClick={toggleColors}>
          Color rows
        </button>
        <button onClick={toggleSortByCountry}>
          {sortByCountry ? 'Show by default' : 'Sort by country'}
          </button>
      </header>
      <main>
        {
          <UsersList deleteUser={handleDelete} showColors={showColors} users={sortUsers} />
        }
      </main>
    </div>
  )
}

export default App
