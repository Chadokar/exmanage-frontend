import { useStorageState } from "@/hooks/useStorageState";
import axios from "axios";
import { useNavigation } from "expo-router";
import {
  useContext,
  createContext,
  type PropsWithChildren,
  useState,
} from "react";

// define interface of group : {name: string, id: string}
interface Group {
  name?: string;
  id?: string;
}

const AuthContext = createContext<{
  signIn: (payload: any) => void;
  signOut: () => void;
  setGroup: (group: Group) => void;
  setAmount: (amount: number) => void;
  group?: Group | null;
  amount?: number | null;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  setGroup: () => null,
  setAmount: () => null,
  group: null,
  amount: null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");
  const [group, setGroup] = useState<Group | null>(null);
  const [amount, setAmount] = useState<number | null>(null);
  const navigation = useNavigation<{
    navigate: (route: { name: string }) => void;
  }>();

  return (
    <AuthContext.Provider
      value={{
        signIn: (payload) => {
          // Perform sign-in logic here
          axios
            .post("/member", payload)
            .then((res) => {
              // console.log(res.data);
              setSession(res.data.access);
              navigation.navigate({ name: "(home)" });
            })
            .catch((err) => {
              console.log(err);
            });
        },
        signOut: () => {
          setSession(null);
        },
        setGroup,
        setAmount,
        group,
        amount,
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
