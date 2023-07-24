"use client";

import Modal from "@/components/Modal";
import {useSessionContext, useSupabaseClient} from "@supabase/auth-helpers-react";
import {useRouter} from "next/navigation";
import React, {useEffect} from "react";
import {Auth} from "@supabase/auth-ui-react";
import {ThemeSupa} from "@supabase/auth-ui-shared";
import useAuthModal from "@/hooks/useAuthModal";

const AuthModal = () => {
    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const {session} = useSessionContext();

    //triggering this modal not by default but on open by signIn or logIn
    const { onClose, isOpen } = useAuthModal();

    //close the modal when signIn or logIn successfully
    useEffect(() => {
        if (session){
            router.refresh();
            onClose();
        }
    }, [session, router, onClose]);

    const onChange = (open: boolean) => {
        if (!open) {
            onClose();
        }
    }

    return (
        <Modal title="Welcome back" description="LogIn to your account" isOpen={isOpen} onChange={onChange}>
            <Auth supabaseClient={supabaseClient}
                  theme="dark"
                  //authentication provider used
                  providers={['github', 'google']}
                  magicLink
                  appearance={{
                      theme: ThemeSupa,
                      variables: {
                          default: {
                              colors: {
                                  brand: '#404040',
                                  brandAccent: '#22c55e'
                              }
                          }
                      }
                  }}/>
        </Modal>
    );
}

export default AuthModal;