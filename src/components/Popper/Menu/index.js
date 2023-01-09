import PropTypes from 'prop-types';
import Tippy from "@tippyjs/react/headless";
import classNames from "classnames/bind";
import { useState } from "react";

import { Wrapper as PopperWrapper } from '~/components/Popper';
import MenuItem from "./MenuItem";
import Header from "./Header";
import styles from "./Menu.module.scss"

const defaultfn = () => { }

const cx = classNames.bind(styles)
function Menu({ children, items = [], hideOnClick = false, onChange = defaultfn }) {
  const [history, setHistory] = useState([{ data: items }])
  const current = history[history.length - 1]

  const renderItems = () => {
    return current.data.map((item, index) => {
      const isHasChildren = !!item.children
      return (
        <MenuItem
          key={index}
          data={item}
          onClick={() => {
            if (isHasChildren) {
              setHistory(prev => [...prev, item.children])
            } else {
              onChange(item)
            }
          }}
        >

        </MenuItem>
      )
    })
  }

  const renderResult = attrs => (
    <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
      <PopperWrapper className={cx('menu-popper')}>
        {history.length > 1 && (
          <Header
            title={current.title}
            onBack={handleBack}
          />)}
        <div className={cx('menu-body')}>
          {renderItems()}
        </div>
      </PopperWrapper>
    </div>
  )

  const handleResetMenu = () => {
    setHistory(prev => prev.slice(0, 1))
  }

  const handleBack = () => {
    setHistory(prev => prev.slice(0, history.length - 1))
  }

  return (
    <Tippy
      delay={[0, 800]}
      offset={[12, 10]}
      interactive
      hideOnClick={hideOnClick}
      placement='bottom-end'
      render={renderResult}
      onHide={handleResetMenu}
    >
      {children}
    </Tippy>
  )
}

Menu.propTypes = {
  children: PropTypes.node.isRequired,
  items: PropTypes.array,
  hideOnClick: PropTypes.bool,
  onChange: PropTypes.func,
}
export default Menu;