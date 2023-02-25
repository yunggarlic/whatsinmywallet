import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { MeshProvider} from "@meshsdk/react"
import { Rubik } from "@next/font/google";

const rubik = Rubik({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {

  
  return <MeshProvider><style jsx global>
    {
      `html{
        font-family: ${rubik.style.fontFamily}};
      }`
    }</style><Component {...pageProps} /></MeshProvider>
}
