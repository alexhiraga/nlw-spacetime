import { getUser } from "@/lib/auth";
import { LogOutIcon, User } from "lucide-react";
import Image from "next/image";

export function Profile() {
    const { name, avatarUrl } = getUser()

    return (
        <div className="flex items-center gap-3 text-left">
            <Image src={avatarUrl} width={40} height={40} alt="" className="w-10 h-10 rounded-full" />

            <p className="max-w-[140px] text-sm leading-snug">
                {name}
                <a href="/api/auth/logout" className="flex gap-1 items-center text-red-300 hover:text-red-200">
                    <LogOutIcon className="w-4 h-4" />
                    Log out
                </a>
            </p>
        </div>
    )
}