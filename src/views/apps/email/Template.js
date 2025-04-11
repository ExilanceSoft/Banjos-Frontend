import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarHeader,
  CSidebarNav,
  CSidebarToggler,
  CNavItem,
  CNavLink,
  CContainer,
  CCard,
  CCardBody,
  CBadge,
} from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'

import { logo } from 'src/assets/brand/logo'
import { sygnet } from 'src/assets/brand/sygnet'

import { AppAside, AppBreadcrumb, AppFooter, AppHeader } from '../../../components'
import {
  cilBookmark,
  cilInbox,
  cilPaperPlane,
  cilPencil,
  cilSpeedometer,
  cilStar,
  cilTrash,
} from '@coreui/icons'

// eslint-disable-next-line react/prop-types
const EmailNav = ({ children }) => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <>
      <CSidebar
        colorScheme="light"
        position="fixed"
        unfoldable={unfoldable}
        visible={sidebarShow}
        onVisibleChange={(visible) => {
          dispatch({ type: 'set', sidebarShow: visible })
        }}
      >
        <CSidebarHeader className="bg-primary">
          <CSidebarBrand as={NavLink} to="/">
            <CIcon customClassName="sidebar-brand-full" icon={logo} height={32} />
            <CIcon customClassName="sidebar-brand-narrow" icon={sygnet} height={32} />
          </CSidebarBrand>
          <CCloseButton
            className="d-lg-none"
            dark
            onClick={() => dispatch({ type: 'set', sidebarShow: false })}
          />
          <CSidebarToggler
            onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
          />
        </CSidebarHeader>
        <CSidebarNav className="border-end">
          <CNavItem>
            <CNavLink as={NavLink} to="./compose">
              <CIcon icon={cilPencil} customClassName="nav-icon" />
              Compose
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink as={NavLink} to="./inbox">
              <CIcon icon={cilInbox} customClassName="nav-icon" />
              Inbox
              <CBadge color="danger-gradient" className="ms-auto">
                4
              </CBadge>
            </CNavLink>
          </CNavItem>
          <CNavItem color="success" href="#">
            <CIcon icon={cilStar} customClassName="nav-icon" />
            Stared
          </CNavItem>
          <CNavItem color="success" href="#">
            <CIcon icon={cilPaperPlane} customClassName="nav-icon" />
            Sent
          </CNavItem>
          <CNavItem color="success" href="#">
            <CIcon icon={cilTrash} customClassName="nav-icon" />
            Trash
          </CNavItem>
          <CNavItem href="#">
            <CIcon icon={cilBookmark} customClassName="nav-icon" />
            Important
            <CBadge color="info-gradient" className="ms-auto">
              25
            </CBadge>
          </CNavItem>
          <CNavItem className="mt-auto">
            <CNavLink as={NavLink} to="/">
              <CIcon icon={cilSpeedometer} customClassName="nav-icon" />
              Dashboard
            </CNavLink>
          </CNavItem>
        </CSidebarNav>
      </CSidebar>
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <CContainer lg className="px-4">
            <AppBreadcrumb />
            <CCard className="mb-4">
              <CCardBody>{children}</CCardBody>
            </CCard>
          </CContainer>
        </div>
        <AppFooter />
      </div>
      <AppAside />
    </>
  )
}

export default EmailNav
