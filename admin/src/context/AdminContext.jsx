import React, { useCallback, useContext, useEffect, useState } from 'react'
import { authDataContext } from './AuthContext'
import { adminDataContext as AdminDataContext } from './adminDataContext'
import axios from 'axios'

function AdminContext({ children }) {
  let [adminData, setAdminData] = useState(null)
  let { serverUrl } = useContext(authDataContext)


  const getAdmin = useCallback(async () => {
    try {
      const adminToken = localStorage.getItem("adminToken")
      if (!adminToken) {
        setAdminData(null)
        return
      }
      let result = await axios.get(serverUrl + "/api/user/getadmin", {
        withCredentials: true,
        headers: adminToken ? { Authorization: `Bearer ${adminToken}` } : {}
      })

      setAdminData(result.data)
    } catch (error) {
      setAdminData(null)
      console.log(error)
    }
  }, [serverUrl])

  useEffect(() => {
    getAdmin()
  }, [getAdmin])


  let value = {
    adminData, setAdminData, getAdmin
  }
  return (
    <div>
      <AdminDataContext.Provider value={value}>
        {children}
      </AdminDataContext.Provider>

    </div>
  )
}

export default AdminContext