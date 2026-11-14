import type { ButtonHTMLAttributes } from 'react'
import { buttonStyles, type ButtonVariant } from './buttonStyles'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  fullWidth?: boolean
  /** Mostra um indicador de carregamento e bloqueia cliques repetidos. */
  isLoading?: boolean
}

/** Botão primário (roxo) ou secundário (contorno). Ícones entram como filhos. */
export function Button({
  variant = 'primary',
  fullWidth = false,
  isLoading = false,
  disabled,
  type = 'button',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      className={buttonStyles({ variant, fullWidth, className })}
      {...props}
    >
      {isLoading && (
        <span
          aria-hidden="true"
          className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      )}
      {children}
    </button>
  )
}
