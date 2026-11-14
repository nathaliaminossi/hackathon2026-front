/** Junta classes CSS ignorando valores falsos.
 *  cn('px-4', isActive && 'bg-primary-600') → 'px-4 bg-primary-600' */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}
