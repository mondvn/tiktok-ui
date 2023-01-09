import classNames from 'classnames/bind'
import config from '~/config'
import Menu from './Menu'
import MenuItem from './Menu/MenuItem'
import { FollowingIcon, HomeIcon, LiveIcon, HomeActiveIcon, FollowingActiveIcon, LiveActiveIcon } from '~/components/Icon'
import styles from './Sidebar.module.scss'

const cx = classNames.bind(styles)
function Sidebar() {
  return (
    <aside className={cx('wrapper')}>
      <Menu>
        <MenuItem title="For You " to={config.routes.home} icon={<HomeIcon />} activeIcon={<HomeActiveIcon />} />
        <MenuItem title="Following " to={config.routes.following} icon={<FollowingIcon />} activeIcon={<FollowingActiveIcon />} />
        <MenuItem title="LIVE" to={config.routes.live} icon={<LiveIcon />} activeIcon={<LiveActiveIcon />} />
      </Menu>
    </aside>
  )
}

export default Sidebar