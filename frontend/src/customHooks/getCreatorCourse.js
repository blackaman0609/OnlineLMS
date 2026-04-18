import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { serverUrl } from "../App";
import { setCreatorCourseData } from "../redux/courseSlice";

const getCreatorCourse = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    const creatorCourses = async () => {
      try {
        const result = await axios.get(
          serverUrl + "/api/course/getcreator",
          { withCredentials: true }
        );

        console.log(result.data);

        // ✅ FIX
        dispatch(setCreatorCourseData(result.data.data));
      } catch (error) {
        console.log(error);
      }
    };

    if (userData) {
      creatorCourses();
    }
  }, [userData, dispatch]);
};

export default getCreatorCourse;