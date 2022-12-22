import Head from 'next/head'
import { Inter } from '@next/font/google'
import { GetServerSideProps } from 'next'
import { PrismaClient } from '.prisma/client'
import { type Card } from "@prisma/client"
import CardDisplay from '../components/carddisplay'
const inter = Inter({ subsets: ['latin'] })

const prisma = new PrismaClient();

export const getServerSideProps: GetServerSideProps = async ({req}) => {
  const data = await prisma.card.findMany();

  return { props: { data }}
};

export default function Home({ data }: { data: Array<Card> } ) {
  return (
    <>
      <main>
        <div className="bg-white">
          <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 id="products-heading" className="sr-only">Products</h2>

            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
              {data.map((card, i) => <CardDisplay key={i} card={card} />)}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
