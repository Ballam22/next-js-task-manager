import Image from 'next/image';

export default function Logo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Image src="/logo.png" alt="Task Manager Logo" width={32} height={32} />
      <span className="text-xl font-bold text-primary">Task Manager</span>
    </div>
  );
}
