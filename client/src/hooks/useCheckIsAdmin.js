import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { checkIsAdmin, logout } from "../redux/actions/user";

const useCheckIsAdmin = () => {
  const dispatch = useDispatch();
  const { user, isInitializing } = useSelector(({ user }) => user);
  const [checkingIsAdmin, setCheckingIsAdmin] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Verify again with backend to check user's role
  useEffect(() => {
    (async () => {
      if (!isInitializing) {
        try {
          if (!(user && user.role === "admin")) throw new Error(); // User in state is not authenticated or not "admin"
          await checkIsAdmin(); // Verify with server again, throws error if user's role is not "admin"
          setIsAdmin(true);
        } catch (error) {
          setIsAdmin(false);
          dispatch(logout()); // Kicks user out if not admin but attempts to access admin route
        }

        setCheckingIsAdmin(false); // Finish checking
      }
    })();
  }, [isInitializing, user, dispatch]);

  return { checkingIsAdmin, isAdmin };
};

export default useCheckIsAdmin;
