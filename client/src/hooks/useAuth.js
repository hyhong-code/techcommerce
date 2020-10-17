import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { auth } from "../services/firebase";
import { loadUser } from "../redux/actions/user";

const useAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      try {
        if (user) {
          dispatch(loadUser(user));
        }
      } catch (error) {
        console.error(error);
      }
    });

    return unsubscribe;
  }, []);

  return null;
};

export default useAuth;
