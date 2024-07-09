import React from 'react'
import AdminSidebar from './AdminComponents.jsx/AdminSidebar'
import "../../Styles/AdminSidebar.css"

const Admin = () => {
  return (
    <div className='Admin-components'>
      <div>
        <AdminSidebar/>
      </div>
      <div>
        <p>Hello Admin Welcome back</p>
      </div>
    </div>
  )
}

export default Admin
