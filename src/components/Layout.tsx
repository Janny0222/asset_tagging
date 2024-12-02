import ProtectedRoute from "@/components/ProtectedRoute";
import { lato } from "@/styles/font";
import { Toaster } from 'react-hot-toast'
import Head from "next/head";
import NavBar from "@/components/NavBar";


export default function Layout({ children }: {children: React.ReactNode}){
    return (
        <>
        <ProtectedRoute>
        <Head>
            <link rel="icon" href="/logo/greenstone-logo.png" />
        </Head>
                <NavBar />
                <div className={`  mx-auto`}>
                   <Toaster position="top-center" reverseOrder={false} />
                    {children}
                </div>
        </ProtectedRoute>
        </>
    )
}