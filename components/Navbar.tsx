import LogoutButton from '@/app/logout/LogoutButton';
import Link from 'next/link';
import { Avatar } from './Avatar';

export function Navbar() {
  return (
    <div className="navbar bg-base-100 text-base-content shadow-lg px-4">
      <div className="flex-1">
        <Link href="/" className="text-xl font-bold">
          Agile Tracker
        </Link>
      </div>
      <div className="flex-none gap-4">
        <div className="dropdown dropdown-end">
          <button className="btn btn-ghost btn-circle avatar">
            <Avatar src="/default-avatar.jpg" />
          </button>
          <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <Link href={{ pathname: '/dashboard' }}>Dashboard</Link>
            </li>
            <li>
              <Link href={{ pathname: '/profile' }}>Profile</Link>
            </li>
            <li>
              <LogoutButton />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
