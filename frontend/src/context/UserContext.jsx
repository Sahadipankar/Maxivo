import React, { createContext, useContext, useEffect, useState } from 'react'
import { authDataContext } from './AuthContext'
import axios from 'axios'

export const userDataContext = createContext()
function UserContext({ children }) {
  let [userData, setUserData] = useState("")
  let { serverUrl } = useContext(authDataContext)


  const getCurrentUser = async () => {
    try {
      const userToken = localStorage.getItem("userToken")
      if (localStorage.getItem("sessionActive") !== "true" || !userToken) {
        setUserData(null)
        return
      }
      let result = await axios.get(serverUrl + "/api/user/getcurrentuser", {
        withCredentials: true,
        headers: userToken ? { Authorization: `Bearer ${userToken}` } : {}
      })

      setUserData(result.data)

    } catch (error) {
      setUserData(null)
      localStorage.removeItem("sessionActive")
      localStorage.removeItem("userToken")
    }
  }

  useEffect(() => {
    getCurrentUser()
  }, [serverUrl])



  let value = {
    userData, setUserData, getCurrentUser
  }


  return (
    <div>
      <userDataContext.Provider value={value}>
        {children}
      </userDataContext.Provider>
    </div>
  )
}

export default UserContext
