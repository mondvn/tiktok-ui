import Tippy from "@tippyjs/react/headless";
import classNames from "classnames/bind";
import { useState } from "react";

import { Wrapper as PopperWrapper } from '~/components/Popper';
import MenuItem from "./MenuItem";
import Header from "./Header";
import styles from "./Menu.module.scss"

const defaultfn = () => { }

const cx = classNames.bind(styles)
function Menu({ children, items = [], onChange = defaultfn }) {
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

  return (
    <Tippy
      delay={[0, 800]}
      interactive
      placement='bottom-end'
      render={attrs => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
          <PopperWrapper className={cx('menu-popper')}>
            {history.length > 1 && <Header
              title={'Language'}
              onBack={() => {
                setHistory(prev => prev.slice(0, history.length - 1))
              }}
            />}
            {renderItems()}
          </PopperWrapper>
        </div>
      )}>
      {children}
    </Tippy>
  )
}

export default Menu;