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
  const [loading, setLoading] = useState(false)

  const inputRef = useRef()

  useEffect(() => {
    if (!searchValue.trim()) {
      setSearchResult([])
      return
    }
    setLoading(true)

    fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(searchValue)}&type=less`)
      .then(res => res.json())
      .then(res => {
        setSearchResult(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }, [searchValue])

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
            <h4 className={cx('search-title')}>Accounts</h4>
            {searchResult.map(result => (
              <AccountItem key={result.id} data={result} />
            ))}
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
        {!!searchValue && !loading &&
          <button
            className={cx('clear')}
            onClick={handleClearText}
          >
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
        }
        {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
        <button className={cx('search-btn')}>
          <SearchIcon />
        </button>
      </div>
    </HeadlessTippy>
  )
}

export default Search;