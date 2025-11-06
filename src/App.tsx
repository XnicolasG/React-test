import { useEffect, useRef, useState } from 'react'
import './App.css'
import { UsersList } from './components/UsersList'
import { type User } from './types'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sortByCountry, setSortByCountry] = useState(false)
  const [showReset, setShowReset] = useState(false)
  const [filterCountry, setFilterCountry] = useState<null | string>(null)

  const originalState = useRef<User[]>([])


  const toggleColors = () => {
    setShowColors(!showColors)
    console.log(showColors);
  }

  const toggleSortByCountry = () => { setSortByCountry(!sortByCountry) }

  const handleReset = () => {
    setUsers(originalState.current)
    setShowReset(false)
  }


  const filteredUsers =  filterCountry !== null && filterCountry.length > 0 
  ? users.filter((user => {
    return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
  })) : users

  const sortUsers = sortByCountry ?
    // [...filteredUsers].sort((a, b) => {
    //   return a.location.country.localeCompare(b.location.country)

    filteredUsers.toSorted((a, b) => {
      return a.location.country.localeCompare(b.location.country)
    }) : filteredUsers

  const handleDelete = (email: string) => {
    const filterUsers = users.filter((users) => users.email !== email)
    setUsers(filterUsers)
    setShowReset(true)
  }

  useEffect(() => {
    fetch('https://randomuser.me/api?results=100')
      .then(res => res.json())
      .then(res => {
        setUsers(res.results)
        originalState.current = res.results
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
        {
          showReset &&
          <button onClick={handleReset}>Initial state</button>
        }
        <input 
        type="text" placeholder='filter by country...'
        onChange={(e) => { setFilterCountry(e.target.value)}}
        />
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
