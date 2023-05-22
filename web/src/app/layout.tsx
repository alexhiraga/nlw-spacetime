import './globals.css'
import { 
    Roboto_Flex as Roboto, 
    Bai_Jamjuree as BaiJamjuree 
} from 'next/font/google'
import { ReactNode } from 'react'
import { Hero } from '@/components/Hero'
import { Profile } from '@/components/Profile'
import { SignIn } from '@/components/SignIn'
import { Copyright } from '@/components/Copyright'
import { cookies } from 'next/headers'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })
const baiJamJuree = BaiJamjuree({ subsets: ['latin'], weight: '700', variable: '--font-bai-jamjuree' })

export const metadata = {
    title: 'NLW Spacetime',
    description: 'A time capsule built with React.JS, Next.JS, TailwindCSS and TypeScript.',
}

export default function RootLayout({ children }: { children: ReactNode }) {

    const isAuthenticated = cookies().has('token')

    return (
        <html lang="en">
            <body className={`${roboto.variable} ${baiJamJuree.variable} font-sans text-gray-100 bg-gray-900`}>
                
                <main className="grid grid-cols-2 min-h-screen">
                    <div className="flex flex-col items-start justify-between px-28 py-16 relative overflow-hidden border-r border-white/10  bg-[url(../assets/bg-stars.svg)] bg-cover">
                        {/* Blur */}
                        <div className="absolute right-0 top-1/2 h-[288px] w-[526px] bg-purple-700 opacity-50 -translate-y-1/2 translate-x-1/2 rounded-full blur-full" />

                        {/* Stripes */}
                        <div className="absolute right-2 top-0 bottom-0 w-2 bg-stripes" />

                        {isAuthenticated ? <Profile /> : <SignIn />}

                        <Hero />

                        <Copyright />
                    </div>

                    <div className="overflow-y-scroll max-h-screen flex flex-col bg-[url(../assets/bg-stars.svg)] bg-cover">
                        {children}
                    </div>
                </main>
            </body>
        </html>
    )
}
