import React, { createContext, useContext, useEffect, useState } from 'react'
import { authDataContext } from './AuthContext'
import axios from 'axios'

export const adminDataContext = createContext()
function AdminContext({ children }) {
  let [adminData, setAdminData] = useState(null)
  let { serverUrl } = useContext(authDataContext)


  const getAdmin = async () => {
    try {
      const adminToken = localStorage.getItem("adminToken")
      let result = await axios.get(serverUrl + "/api/user/getadmin", {
        withCredentials: true,
        headers: adminToken ? { Authorization: `Bearer ${adminToken}` } : {}
      })

      setAdminData(result.data)
      console.log(result.data)
    } catch (error) {
      setAdminData(null)
      console.log(error)
    }
  }

  useEffect(() => {
    getAdmin()
  }, [serverUrl])


  let value = {
    adminData, setAdminData, getAdmin
  }
  return (
    <div>
      <adminDataContext.Provider value={value}>
        {children}
      </adminDataContext.Provider>

    </div>
  )
}

export default AdminContext