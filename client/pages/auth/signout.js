import useRequest from "../../hooks/use-request";
import { Router } from "next/router";
import { useEffect } from "react";

export default () => {
  const { doRequest } = useRequest({
    url: "/api/users/signout",
    method: "post",
    body: {},
    onSuccess: () => Router.push("/auth/index")
  });

  useEffect(() => {
    doRequest();
  }, []);

  return null;
};
