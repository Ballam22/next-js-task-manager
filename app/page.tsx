import Link from 'next/link';
import { redirect } from 'next/navigation';

export default function Home() {
  return (
    <div className="">
      <h1 className="text-3xl font-bold text-center">
        Welcome to our task manager site
      </h1>
      <Link
        href="/login"
        className="text-blue-600 font-semibold hover:underline"
      >
        Login
      </Link>
    </div>
  );
}
