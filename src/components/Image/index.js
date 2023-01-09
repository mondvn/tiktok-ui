import PropTypes from 'prop-types';
import classNames from 'classnames/bind'
import { useState, forwardRef } from 'react'
import images from '~/assets/images'
import styles from './Image.module.scss'

const cx = classNames.bind(styles)

const Image = forwardRef(({ className, src, alt, fallback: customFallback = images.noImage, ...props }, ref) => {
  const [fallback, setFallback] = useState('')
  const handleError = () => {
    setFallback(customFallback)
  }
  return (
    <img
      className={cx(styles.wrapper, className)}
      ref={ref}
      src={fallback || src}
      alt={alt}
      onError={handleError}
      {...props}
    />
  )
})
Image.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
  fallback: PropTypes.string,
}

export default Image; 