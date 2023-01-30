import React from 'react'
import OwnerNavbar from '../../component/owner-nav.component'
import { ROLES } from '../../const/roles.const'

function MainOwner() {

    window.document.title = `CABTOM | ${ROLES.ADMIN.toLocaleUpperCase()}`;
  return <>
    <OwnerNavbar />
  </>
}

export default MainOwner
