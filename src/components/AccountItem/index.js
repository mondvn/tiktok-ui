import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import Image from '~/components/Image'
import classNames from "classnames/bind";

import styles from './AccountItem.module.scss'

const cx = classNames.bind(styles)

function AccountItem() {
  return (
    <div className={cx('wrapper')}>
      <Image
        className={cx('avatar')}
        src="https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/d2f44d89ccbf5a13cbfdffd0b663057b~c5_300x300.webp?x-expires=1673074800&x-signature=fe3y8wbNmuGb3u48M5NXM%2BTfvSg%3D"
        alt="hoaa" />
      <div className={cx('info')}>
        <h4 className={cx('name')}>
          <span>Đào Lê Phương Hoa</span>
          <FontAwesomeIcon className={cx('check')} icon={faCircleCheck} />
        </h4>
        <span className={cx('username')}>daolehoa</span>
      </div>
    </div>
  )
}

export default AccountItem;