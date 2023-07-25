"use client";
import {useRouter} from "next/navigation";
import {twMerge} from "tailwind-merge";
import {RxCaretLeft, RxCaretRight} from "react-icons/rx";
import {HiHome} from "react-icons/hi";
import {BiSearch} from "react-icons/bi";
import Button from "@/components/Button";
import useAuthModal from "@/hooks/useAuthModal";
import {useSupabaseClient} from "@supabase/auth-helpers-react";
import {useUser} from "@/hooks/useUser";
import {FaUserAlt} from "react-icons/fa";
import toast from "react-hot-toast";

interface HeaderProps {
    children: React.ReactNode;
    className?: string;
}

const Header: React.FC<HeaderProps> = ({
                                           children,
                                           className
                                       }) => {

    const authModal = useAuthModal();
    const router = useRouter();

    const supabaseClient = useSupabaseClient();
    //extract user from user Hook
    const {user} = useUser();

    const handleLogout = async () => {
        const {error} = await supabaseClient.auth.signOut();
        //TODO: reset playing song
        router.refresh();

        if (error) {
            toast.error(error.message);
        }else{
            toast.success("Logged out successfully!");
        }
    }

    return (
        <div className={twMerge(`h-fit bg-gradient-to-b from-emerald-700 p-6`,
            className)}>
            <div className="w-full mb-4 flex items-center justify-between">

                {/*back and forward button NOT in mobile view*/}
                <div className="hidden md:flex gap-x-2 items-center">
                    <button onClick={() => router.back()}
                            className="rounded-full bg-black flex items-center justify-center hover:opacity-50 transition">
                        <RxCaretLeft className="text-white" size={38}/>
                    </button>
                    <button onClick={() => router.forward()}
                            className="rounded-full bg-black flex items-center justify-center hover:opacity-50 transition">
                        <RxCaretRight className="text-white" size={38}/>
                    </button>
                </div>

                {/*home and search mobile button view*/}
                <div className="flex md:hidden gap-x-2">
                    <button
                        className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
                        <HiHome className="text-black" size={20}/>
                    </button>
                    <button
                        className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
                        <BiSearch className="text-black" size={20}/>
                    </button>
                </div>

                {/*right side for login and user info*/}
                <div className="flex justify-between items-center gap-x-3">
                    {/*dynamic content based if the user is logged in or not*/}
                    {user ? (
                        <div className="flex gap-x-4 items-center">
                            <Button className="bg-white px-6 py-2"
                                    onClick={handleLogout}>
                                LogOut
                            </Button>
                            <Button className="bg-white"
                                    onClick={() => router.push('/account')}>
                                <FaUserAlt/>
                            </Button>
                        </div>
                    ) : (
                        <>
                            <div>
                                <Button className="bg-transparent text-neutral-300 font-medium"
                                        onClick={authModal.onOpen}>
                                    Sign Up
                                </Button>
                            </div>
                            <div>
                                <Button className="bg-white px-6 py-2"
                                        onClick={authModal.onOpen}>
                                    Log In
                                </Button>
                            </div>
                        </>)}
                </div>
            </div>
            {children}
        </div>
    );
}

export default Header;