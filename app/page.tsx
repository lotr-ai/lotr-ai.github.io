'use client'
import Image from 'next/image'
import imagePath from '../public/assets/ring.png'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-800">
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <Image
            src={imagePath}
            alt="Yüzüklerin Efendisi"
            width={200}
            height={200}
          />

          <h1 className="text-6xl font-bold text-white">
            Yüzüklerin Efendisi
          </h1>

          <p className="mt-1 text-white">
            Bu oyunda Yüzüklerin Efendisi'nin dünyasında geçen bir hikaye yazacağız. Oyunu oynarken, hikayeyi yazarken ve hikayeyi okurken eğlenmeniz dileğiyle.
          </p>

          <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
            <Link href="/game">
              <h1 className="p-6 mt-6 text-2xl text-white bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 sm:w-full">
                Oyuna Başla
              </h1>
            </Link>
          </div>
        </main>
        <footer className="flex items-center justify-center w-full h-24 border-t mt-10">
          <span className="text-sm text-white">
            Powered by Muhtalip Dede
          </span>
        </footer>
      </div>
    </>
  );
}
