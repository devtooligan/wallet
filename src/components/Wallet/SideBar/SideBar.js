import './SideBar.scss'

import { NavLink } from 'react-router-dom'
import { MdDashboard, MdLock, MdCompareArrows } from 'react-icons/md'
import { GiReceiveMoney } from 'react-icons/gi'
import { BsCurrencyExchange } from 'react-icons/bs'
import { BsPiggyBank } from 'react-icons/bs'
import { BiTransfer } from 'react-icons/bi'
import { Loading } from '../../common'
import { useCallback, useEffect, useRef, useState } from 'react'

const SideBar = ({ match, portfolio }) => {
  const sidebarRef = useRef()
  const [balanceFontSize, setBalanceFontSize] = useState(0)
    const resizeBalance = useCallback(() => {
        const balanceFontSizes = {
            3: '2em',
            5: '1.5em',
            7: '1.3em',
            9: '1.2em',
            11: '1em',
        }

        const charLength = portfolio.balance.total.truncated.length
        const closest = Object.keys(balanceFontSizes).reduce((prev, current) => Math.abs(current - charLength) < Math.abs(prev - charLength) ? current : prev)
        setBalanceFontSize(balanceFontSizes[closest])
    }, [portfolio.balance.total])

    useEffect(() => resizeBalance(), [resizeBalance])

  return (
    <div id="sidebar" ref={sidebarRef}>
      <NavLink to={match.url + '/dashboard'}>
        <div id="logo" />
        <div id="icon" />
      </NavLink>

      <div className="balance">
        <label>Balance</label>
        {portfolio.isBalanceLoading ? (
          <Loading />
        ) : (
          <div
            className="balanceDollarAmount"
            style={{ fontSize: balanceFontSize }}
          >
            <span className="dollarSign highlight">$</span>
            {portfolio.balance.total.truncated}
            <span className="highlight">
              .{portfolio.balance.total.decimals}
            </span>
          </div>
        )}
      </div>
      <nav>
        <NavLink to={match.url + "/dashboard"} activeClassName="selected">
          <div className="item">
              <MdDashboard/>Dashboard
          </div>
        </NavLink>
        <NavLink to={match.url + "/deposit"} activeClassName="selected">
          <div className="item">
              <GiReceiveMoney/>Deposit
          </div>
        </NavLink>
        <NavLink to={match.url + "/transfer"} activeClassName="selected">
          <div className="item">
              <BiTransfer/>Transfer
          </div>
        </NavLink>
        <NavLink to={match.url + "/swap"} activeClassName="selected">
          <div className="item">
              <BsCurrencyExchange/>Swap
          </div>
        </NavLink>
        <NavLink to={match.url + "/earn"} activeClassName="selected">
          <div className="item">
              <BsPiggyBank/>Earn
          </div>
        </NavLink>
        <NavLink to={match.url + "/transactions"} activeClassName="selected">
          <div className="item">
                <MdCompareArrows/>Transactions
          </div>
        </NavLink>
        <NavLink to={match.url + "/security"} activeClassName="selected">
          <div className="item">
              <MdLock/>Security
          </div>
        </NavLink>
      </nav>
    </div>
  )
}

export default SideBar