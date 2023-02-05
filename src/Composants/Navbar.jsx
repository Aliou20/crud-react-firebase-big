import { MDBCollapse, MDBContainer, MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle, MDBIcon, MDBNavbar, MDBNavbarBrand, MDBNavbarItem, MDBNavbarLink } from 'mdb-react-ui-kit'
import React from 'react'
import profil from '../Assets/profil.jpg'
import './Layout.css'

function Navbar({toggleSidebar , broken}) {
  return (
    <MDBNavbar fixed='top' light bgColor='light'>
      <MDBContainer fluid>
      <main style={{ padding: 10 }}>
        <div>
          {broken && (
            <button className="sb-button" onClick={() => toggleSidebar()}>
              Toggle
            </button>
          )}
        </div>
      </main>
        <MDBNavbarBrand href='#'>Navbar</MDBNavbarBrand>
        <form className='inputRecherche d-flex align-items-center justify-content-center'>
          <input type='search' className='form-control inputRecherche' placeholder='Seach' aria-label='Search' />
        </form>
        <MDBDropdown>
          <MDBDropdownToggle className='MDBDropdownToggle'>
            <img src={profil} alt='profil' className='imgProfil' />
          </MDBDropdownToggle>
          <MDBDropdownMenu className='MDBDropdownMenu'>
            <MDBDropdownItem link>Profil</MDBDropdownItem>
            <MDBDropdownItem link> Admin</MDBDropdownItem>
            <MDBDropdownItem link>Déconnexion</MDBDropdownItem>
          </MDBDropdownMenu>
        </MDBDropdown>
      </MDBContainer>
    </MDBNavbar>
  )
}

export default Navbar