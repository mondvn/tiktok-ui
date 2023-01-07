import { useState, useEffect, useRef } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleXmark,
  faSpinner
} from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import styles from './Search.module.scss'
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import { SearchIcon } from '~/components/Icon';

const cx = classNames.bind(styles);

function Search() {
  const [searchResult, setSearchResult] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [showResult, setShowResult] = useState(true)

  const inputRef = useRef()

  useEffect(() => {
    setTimeout(() => {
      setSearchResult([1, 2, 3, 4])
    }, 0)
  }, [])

  // Handle
  const handleClearText = () => {
    setSearchValue('')
    setSearchResult([])
    inputRef.current.focus()
  }
  const handleHideResult = () => {
    setShowResult(false)
  }
  return (
    <HeadlessTippy
      visible={showResult && searchResult.length > 0}
      interactive={true}
      onClickOutside={handleHideResult}
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
      )}
    >
      <div className={cx('search')}>
        <input
          ref={inputRef}
          type="text"
          value={searchValue}
          placeholder='Search accounts and videos'
          spellCheck={false}
          onChange={e => setSearchValue(e.target.value)}
          onFocus={e => setShowResult(true)}
        />
        {!!searchValue &&
          <button
            className={cx('clear')}
            onClick={handleClearText}
          >
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
        }
        {/* <FontAwesomeIcon className={cx('loading')} icon={faSpinner} /> */}
        <button className={cx('search-btn')}>
          <SearchIcon />
        </button>
      </div>
    </HeadlessTippy>
  )
}

export default Search;