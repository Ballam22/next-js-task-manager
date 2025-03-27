'use client';
import { CldImage } from 'next-cloudinary';

export function Avatar({ src }: { src: string }) {
  return (
    <CldImage
      width="40"
      height="40"
      src={src}
      alt="User avatar"
      className="rounded-full"
    />
  );
}
