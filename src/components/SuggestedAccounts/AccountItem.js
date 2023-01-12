import PropTypes from 'prop-types';
import classNames from "classnames/bind";
import Tippy from '@tippyjs/react/headless';

import styles from './SuggestedAccounts.module.scss'
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import AccountPreview from './AccountPreview';

const cx = classNames.bind(styles)
function AccountItem() {
  const renderPreview = (props) => (
    <div tabIndex="-1" {...props}>
      <PopperWrapper>
        <AccountPreview />
      </PopperWrapper>
    </div>
  )
  return (
    // Using a wrapper <div> tag around the reference element solves this by creating a new parentNode context. 
    <div>
      <Tippy
        interactive
        visible
        delay={[800, 0]}
        offset={[-20, 0]}
        placement="bottom"
        render={renderPreview}
      >
        <div className={cx('account')}>
          <img className={cx('avatar')}
            src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/8c6f13e90aa7356a727f4d14a323444d~c5_100x100.jpeg?x-expires=1673546400&x-signature=YIEZKx8ngi2Lzd7tcoLdChkwUlY%3D"
            alt="avatar"
          />
          <div className={cx('info')}>
            <div className={cx('info-wrapper')}>
              <h4 className={cx('name')}>cciinnn</h4>
              <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
            </div>
            <p className={cx('username')}>CiiN </p>
          </div>
        </div>
      </Tippy>
    </div>
  )
}

AccountItem.propTypes = {}

export default AccountItem