import { Link } from 'react-router-dom';
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCameraRetro,
  faEarthAsia,
  faGear,
  faPlus,
  faSignOut
} from '@fortawesome/free-solid-svg-icons'
import { faTiktok } from '@fortawesome/free-brands-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Button from '~/components/Button'
import styles from './Header.module.scss'
import images from '~/assets/images'
import Menu from '~/components/Popper/Menu';
import { faCircleQuestion, faKeyboard, faMoon, faUser } from '@fortawesome/free-regular-svg-icons';
import { InboxIcon, MenuIcon, MessageIcon, PlusIcon } from '~/components/Icon';
import Image from '~/components/Image'
import Search from '../Search'
import config from '~/config'

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

  const currentUser = true

  const handleMenuChange = (menuItem) => {
    console.log(menuItem);
  }


  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <Link className={cx('logo-link')} to={config.routes.home}><img src={images.logo} alt="TikTok Logo" /></Link>

        <Search />

        <div className={cx('action')}>
          {currentUser ? (
            <>
              <Button text leftIcon={<PlusIcon />}>Upload</Button>
              <Tippy content="Messages" placement='bottom' delay={[0, 50]}>
                <button className={cx('action-btn')}>
                  <MessageIcon />
                </button>
              </Tippy>
              <Tippy content="Inbox" placement='bottom' delay={[0, 50]}>
                <button className={cx('action-btn')}>
                  <InboxIcon />
                  <span className={cx('badge')}>12</span>
                </button>
              </Tippy>
            </>
          ) : (
            <>
              <Button text leftIcon={<FontAwesomeIcon icon={faPlus} />}>Upload</Button>
              <Button primary>Log in</Button>


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
                <MenuIcon />
              </button>
            )}
          </Menu>
        </div>

      </div>

    </header>
  )
}

export default Header