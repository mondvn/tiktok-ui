import { useState, useEffect, useRef } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleXmark,
  faSpinner
} from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'

import * as searchServices from '~/services/searchService'
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import { SearchIcon } from '~/components/Icon';
import { useDebounce } from '~/hooks';
import styles from './Search.module.scss'

const cx = classNames.bind(styles);

function Search() {
  const [searchResult, setSearchResult] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [loading, setLoading] = useState(false)

  const debouncedValue = useDebounce(searchValue, 500)

  const inputRef = useRef()

  useEffect(() => {
    if (!debouncedValue.trim()) {
      setSearchResult([])
      return
    }
    setLoading(true)

    const fetchApi = async () => {
      setLoading(true)
      const result = await searchServices.search(debouncedValue);
      setSearchResult(result)
      setLoading(false)
    }

    fetchApi()

  }, [debouncedValue])

  // Handle
  const handleClearText = () => {
    setSearchValue('')
    setSearchResult([])
    inputRef.current.focus()
  }
  const handleHideResult = () => {
    setShowResult(false)
  }

  const handleChange = (e) => {
    const searchValue = e.target.value
    if (!searchValue.startsWith(' ')) {
      setSearchValue(searchValue)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    // Using a wrapper <div> tag around the reference element solves this by creating a new parentNode context. 
    <div>
      <HeadlessTippy
        visible={showResult && searchResult.length > 0}
        interactive
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
            onChange={handleChange}
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
          <button className={cx('search-btn')} onClick={handleSubmit}>
            <SearchIcon />
          </button>
        </div>
      </HeadlessTippy>
    </div>
  )
}

export default Search;