import PropTypes from 'prop-types';
import Button from '~/components/Button';
import classNames from "classnames/bind";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import styles from './AccountPreview.module.scss'
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles)
function AccountPreview() {
  return (
    <div className={cx('wrapper')}>
      <header className={cx('header')}>
        <img className={cx('avatar')}
          src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/8c6f13e90aa7356a727f4d14a323444d~c5_100x100.jpeg?x-expires=1673546400&x-signature=YIEZKx8ngi2Lzd7tcoLdChkwUlY%3D"
          alt="avatar"
        />
        <Button className={cx('btn')} primary>Follow</Button>
      </header>
      <Link className={cx('info')}>
        <p className={cx('name')}>cciinnn</p>
        <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
      </Link>
      <Link className={cx('username')}>CiiN</Link>
      <div className={cx('stat')}>
        <span className={cx('follower-count')}>1632</span>
        <span className={cx('follower')}>Followers</span>
        <span className={cx('like-count')}>2024</span>
        <span className={cx('like')}>Likes</span>
      </div>
    </div>
  )
}

export default AccountPreview;