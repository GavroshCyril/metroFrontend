import Axios from "axios";
import { useDispatch } from "react-redux";
import { update } from "../store/commentsSlice";

export const useComments = () => {
  const dispatch = useDispatch();
  const onRefresh = async () => {
    try {
      const result = await Axios.get("http://localhost:3000/comments");
      dispatch(update(result.data));
    } catch (error) {
      console.error(`Refresh has been failed with error: ${error}`);
    }
  };

  return onRefresh;
};
