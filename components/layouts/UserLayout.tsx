import  Head  from "next/head";
import { FC, ReactNode } from "react";
import { Navbar } from '../ui';
import { Footer } from '../ui/Footer/index';

interface Props {
  children: ReactNode;
  title: string;
  pageDescription: string;
  imageFullUlr?: string;
}

export const UserLayout: FC<Props> = ({ children, title, pageDescription, imageFullUlr }) => {
  return (
    <>
      <Head>
        <title>{ title }</title>

        <meta name="description" content={ pageDescription }/>

        <meta name="og:title" content={ title }/>
        <meta name="og:description" content={ pageDescription }/>

        {
          imageFullUlr && (
            <meta name="og:image" content={ imageFullUlr }/>
          )
        }
        
      </Head>

      <nav>
        <Navbar/>
      </nav>

      <main>
        { children }
      </main>

      <Footer/>
    </>
  )
}
