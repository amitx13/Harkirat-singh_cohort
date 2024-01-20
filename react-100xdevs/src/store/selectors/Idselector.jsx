import { selector } from "recoil";
import user from "../atoms/countRecoil";

const userid = selector({
    key:"selectorUserId",
    get : ({get})=>{
        const userId = get(user)
        return userId.id;
    }
})
export default userid;