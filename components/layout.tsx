import { Inter } from "@next/font/google"
import Head from "next/head"
import Link from "next/link"
import { PropsWithChildren } from "react"


export default ({ children }: PropsWithChildren) => {
  return (
    <>
      <Head>
        <title>Cards</title>
        <meta name="description" content="Card Shop Site" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <Link href="/" className="flex cursor-pointer flex-shrink-0 items-center">
                <img className="block h-8 w-auto lg:hidden" src="/card.png" alt="Your Company" />
                <img className="hidden h-8 w-auto lg:block" src="/card.png" alt="Your Company" />

                <h1 className="ml-2 font-bold text-lg">CardPlace</h1>
              </Link>
              <div className="hidden md:ml-6 md:flex md:space-x-8">
                <Link href="/" className="inline-flex items-center border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900">Home</Link>
                <Link href="/about" className="inline-flex items-center border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900">About</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="md:hidden" id="mobile-menu">
          <div className="space-y-1 pt-2 pb-3">
            <Link href="/" className="block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700 sm:pl-5 sm:pr-6">Home</Link>
          </div>
        </div>
      </nav>

      <main>
        {children}
      </main>
    </>
  )
}