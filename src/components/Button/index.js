
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import styles from './Button.module.scss'

const cx = classNames.bind(styles);

function Button({ to,
  href,
  primary = false,
  outline = false,
  text = false,
  rounded = false,
  small = false,
  large = false,
  disabled = false,
  leftIcon = false,
  rightIcon = false,
  children,
  className,
  onClick,
  ...passProps
}) {

  let Comp = 'button'
  const props = {
    onClick,
    ...passProps
  }

  // Remove event listeners when the button is disabled
  if (disabled) {
    Object.keys(props).forEach(key => {
      if (key.startsWith('on') && typeof props[key] === 'function') {
        delete props[key]
      }
    })
  }

  if (to) {
    props.to = to
    Comp = Link
  } else if (href) {
    props.href = href
    Comp = 'a'
  }

  const classes = cx('wrapper', {
    [className]: className,
    primary,
    outline,
    text,
    rounded,
    small,
    large,
    disabled
  })
  return (
    <Comp
      className={classes} {...props} >
      {leftIcon && <div className={cx('icon')}>{leftIcon}</div>}
      <span className={cx('title')}>{children}</span>
      {rightIcon && <div className={cx('icon')}>{rightIcon}</div>}
    </Comp>
  )
}

export default Button;