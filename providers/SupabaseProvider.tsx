"use client";
import {Database} from "../../types_db";
import {useState} from "react";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {SessionContextProvider, useSupabaseClient} from "@supabase/auth-helpers-react";

interface SupabaseProviderProps {
    children: React.ReactNode;

};

const SupabaseProvider: React.FC<SupabaseProviderProps> = ({
                                                               children
                                                           }) => {
    //all the types of our database are imported to Supabase
  const [SupabaseClient] = useState(() =>
    createClientComponentClient<Database>()
  );

  return(
      <SessionContextProvider supabaseClient={SupabaseClient}>
          {children}
      </SessionContextProvider>
  )
}

export default SupabaseProvider;