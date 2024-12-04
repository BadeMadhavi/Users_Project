import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useTheme } from './context/theme';
import "./index.css";

const UserComponent = () => {
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedUser, setSelectedUser] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const {theme, toggleTheme } = useTheme()

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(json => setUsers(json))
      .catch(error => setError("Failed to load data"));
  }, [])
  const filteredUsers = useMemo(() => {
    return users.filter(user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [users, searchQuery])

  const handleSearch = useCallback(event => {
    setSearchQuery(event.target.value)
  }, [])

  const handleUserClick = useCallback(user => {
    setSelectedUser(user)
    setIsModalOpen(true)
  }, [])

  const handleModalClose = useCallback(() => {
    setSelectedUser(null)
    setIsModalOpen(false)
  }, [])

  return (
    <div className={`container ${theme === 'light' ? 'light-theme' : 'dark-theme'}`}>
      <button className="button" onClick={toggleTheme}>
     {theme === 'light' ? 'Dark' : 'Light'} 
    </button>
      <input type="text" className="search-input" placeholder="Search users" value={searchQuery} onChange={handleSearch}/>

      
      {error ? (<ErrorDisplay error={error} />
      ) : (
        <ul>
          {filteredUsers.map(user => (
            <div key={user.id} className="user-item" onClick={() => handleUserClick(user)}>
                <p style={{color:"black"}}>{user.name}</p>
            </div>
          ))}
        </ul>
      )}

      {isModalOpen && selectedUser && (
        <div className={`modal ${theme === 'light' ? 'light-theme' : 'dark-theme'}`}>
          <h2>{selectedUser.name}</h2>
          <p><strong>ID:</strong> {selectedUser.id}</p>
          <p><strong>Username:</strong> {selectedUser.username}</p>
          <p><strong>Email:</strong> {selectedUser.email}</p>
          <button className="button" onClick={handleModalClose}>Close</button>
        </div>
      )}
    </div>
  )
}

const ErrorDisplay = ({ error }) => (
  <div>
    <p>Error: {error}</p>
  </div>
)

export default UserComponent;
