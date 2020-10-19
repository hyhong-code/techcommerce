import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { auth } from "../services/firebase";
import { loadUser } from "../redux/actions/user";

const useAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      dispatch(loadUser(user));
    });

    return unsubscribe;
  }, [dispatch]);

  return null;
};

export default useAuth;
