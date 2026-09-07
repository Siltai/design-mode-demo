import type { ButtonHTMLAttributes } from 'react'
import styles from './Button.module.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** `primary` is the one filled thing on a surface — use it once. */
  variant?: 'primary' | 'secondary'
  /** Sit on the dark band rather than the page. Picks the ink and the focus ring. */
  onBand?: boolean
}

export default function Button({
  variant = 'primary',
  onBand = false,
  type = 'button',
  className,
  ...rest
}: ButtonProps) {
  const classes = [styles.button, styles[variant], onBand ? styles.onBand : '', className]
    .filter(Boolean)
    .join(' ')

  return <button className={classes} type={type} {...rest} />
}
