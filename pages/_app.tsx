import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout'
import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'] })
export default function App({ Component, pageProps }: AppProps) {
  return (<>
    <style jsx global>
      {`
          :root {
            --inter-font: ${inter.style.fontFamily};
          }
        `}
    </style>
    <Layout>
      <Component {...pageProps} />
    </Layout> </>
  )
}
