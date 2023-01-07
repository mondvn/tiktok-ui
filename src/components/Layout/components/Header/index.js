import { useEffect, useState } from 'react';
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCameraRetro,
  faCircleXmark,
  faEarthAsia,
  faEllipsisVertical,
  faGear,
  faMagnifyingGlass,
  faPlus,
  faSignOut,
  faSpinner
} from '@fortawesome/free-solid-svg-icons'
import { faTiktok } from '@fortawesome/free-brands-svg-icons';

import Tippy from '@tippyjs/react';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import Button from '~/components/Button'
import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './Header.module.scss'
import images from '~/assets/images'
import AccountItem from '~/components/AccountItem';
import Menu from '~/components/Popper/Menu';
import { faCircleQuestion, faKeyboard, faMoon, faUser } from '@fortawesome/free-regular-svg-icons';
import { InboxIcon, MessageIcon, PlusIcon, SearchIcon } from '~/components/Icon';
import Image from '~/components/Image'

const cx = classNames.bind(styles)

const MENU_ITEMS = [
  {
    icon: <FontAwesomeIcon icon={faEarthAsia} />,
    title: 'English',
    children: {
      title: 'Language',
      data: [
        {
          code: 'en',
          title: 'English',
        },
        {
          code: 'vi',
          title: 'Tiếng Việt',
        }
      ]
    }
  },
  {
    icon: <FontAwesomeIcon icon={faCircleQuestion} />,
    title: 'Feedback and help',
    to: '/feedback'
  },
  {
    icon: <FontAwesomeIcon icon={faKeyboard} />,
    title: 'Keyboard shortcuts'
  },
  {
    icon: <FontAwesomeIcon icon={faMoon} />,
    title: 'Dark mode'
  }
]

const userMenu = [
  {
    icon: <FontAwesomeIcon icon={faUser} />,
    title: 'View Profile',
    to: '/@hoa'
  },
  {
    icon: <FontAwesomeIcon icon={faTiktok} />,
    title: 'Get coins',
    to: '/coin'
  },
  {
    icon: <FontAwesomeIcon icon={faCameraRetro} />,
    title: 'LIVE studio',
    to: '/live-studio'
  },
  {
    icon: <FontAwesomeIcon icon={faGear} />,
    title: 'Settings',
    to: '/settings'
  },
  ...MENU_ITEMS,
  {
    icon: <FontAwesomeIcon icon={faSignOut} />,
    title: 'Log out',
    to: '/logout ',
    separate: true
  },
]

function Header() {
  const [searchResult, setSearchResult] = useState([])
  const currentUser = true

  useEffect(() => {
    setTimeout(() => {
      setSearchResult([])
    }, 0)
  }, [])

  const handleMenuChange = (menuItem) => {
    console.log(menuItem);
  }


  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <div className={cx('logo')}>
          <img src={images.logo} alt="TikTok Logo" />
        </div>
        <HeadlessTippy
          visible={searchResult.length > 0}
          interactive={true}
          render={attrs => (
            <div className={cx('search-results')} tabIndex="-1" {...attrs}>
              <PopperWrapper>
                <h4 className={cx('search-title')}>
                  Accounts
                </h4>
                <AccountItem></AccountItem>
                <AccountItem></AccountItem>
                <AccountItem></AccountItem>
              </PopperWrapper>
            </div>
          )}>
          <div className={cx('search')}>
            <input placeholder='Search accounts and videos' spellCheck={false} />
            <button className={cx('clear')}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
            <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
            <button className={cx('search-btn')}>
              <SearchIcon />
            </button>
          </div>
        </HeadlessTippy>
        <div className={cx('action')}>
          {currentUser ? (
            <>
              <Button text leftIcon={<PlusIcon />}>Upload</Button>
              <Tippy content="Messages" placement='bottom' delay={[0, 200]}>
                <button className={cx('action-btn')}>
                  <MessageIcon />
                </button>
              </Tippy>
              <Tippy content="Inbox" placement='bottom' delay={[0, 200]}>
                <button className={cx('action-btn')}>
                  <InboxIcon />
                </button>
              </Tippy>
            </>
          ) : (
            <>
              <Button text leftIcon={<FontAwesomeIcon icon={faPlus} />}>Upload</Button>
              <Button primary>Login</Button>


            </>
          )}
          <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
            {currentUser ? (
              <Image
                className={cx('user-avatar')}
                src="https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/d2f44d89ccbf5a13cbfdffd0b663057b~c5_300x300.webp?x-expires=1673074800&x-signature=fe3y8wbNmuGb3u48M5NXM%2BTfvSg%3D"
                alt="Nguyễn Văn A" />
            ) : (
              <button className={cx('more-btn')}>
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </button>
            )}
          </Menu>
        </div>

      </div>

    </header>
  )
}

export default Header