import Link from 'next/link'

export default function Logo() {
  return (
    <Link
      href="/"
      className="text-lg font-bold tracking-wide hover:opacity-80 transition-opacity"
    >
      Hello Dapp
    </Link>
  )
}
