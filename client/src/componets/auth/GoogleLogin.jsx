import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { loginGoogle } from "../../api/user";
import { getUser } from "../../redux/slice/userSlice";
import withBase from "../../hocs/withBase";
import Cookies from "js-cookie";
function Google({ dispatch, navigate }) {
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: "Bearer " + tokenResponse.access_token },
        });
        const data = {
          email: res.data.email,
          name: res.data.name,
        };
        const user = await loginGoogle(data);
        if (user?.success) {
          Cookies.set("accesstoken", user.token);
          navigate("/");
        }
      } catch (e) {
        dispatch(getUser(null));
      }
    },
  });

  return (
    <div className="w-full flex justify-center px-2">
      <div className="w-full px-2 border py-2 rounded-md hover:border-[#F41E92] flex justify-center items-center">
        <FcGoogle size={24} onClick={() => login()} style={{ cursor: "pointer" }} />
      </div>
    </div>
  );
}

export default withBase(Google);
