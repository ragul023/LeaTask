import React from 'react'
import Logo from '../assets/images.png'
import '../CSS/Header.css'

const Header = () => {
  return (
    <>
        <div className="maincint">
            <div className="logo">
                <div className="image"><img src={Logo} alt="" height={"60px"} width={"60px"} /></div>
                <div className="hdr">
                    <h2>TNLEA</h2>
                </div>
            </div>
        </div>
    </>
  )
}

export default Header
