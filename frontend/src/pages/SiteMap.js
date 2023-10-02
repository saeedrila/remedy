import React from 'react'
import {
  Container,
} from 'react-bootstrap'

import Header from '../components/Common/Header'
import Footer from '../components/Common/Footer'


function SiteMap() {
  return (
    <>
      {/* Header section */}
      <Header />
      <div className="mt-3">
        <Container>

        <div>This is sitemap</div>

        </Container>
      </div>


      {/* Footer section */}
      <Footer />
    </>
    
  )
}

export default SiteMap