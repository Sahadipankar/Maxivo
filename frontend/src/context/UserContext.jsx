import React, { createContext, useContext, useEffect, useState } from 'react'
import { authDataContext } from './AuthContext'
import axios from 'axios'

export const userDataContext = createContext()
function UserContext({ children }) {
  let [userData, setUserData] = useState("")
  let { serverUrl } = useContext(authDataContext)


  const getCurrentUser = async () => {
    try {
      if (localStorage.getItem("sessionActive") !== "true") {
        setUserData(null)
        return
      }
      const userToken = localStorage.getItem("userToken")
      let result = await axios.get(serverUrl + "/api/user/getcurrentuser", {
        withCredentials: true,
        headers: userToken ? { Authorization: `Bearer ${userToken}` } : {}
      })

      setUserData(result.data)

    } catch (error) {
      setUserData(null)
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
