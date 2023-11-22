// import { RootState } from "@/store/store";
// import { useDispatch, useSelector } from "react-redux";

// const userId = useSelector((state: RootState) => state.auth.userName);

export const userAvatarPlaceholder = "http://127.0.0.1:8000/get_face?userId=" + "iWVTxdoXq8Yl2wC48eqQpNifxw22" ||
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_9RrEEwHG9qbjJh5VHu40cxzs60Ygg1GwfL9v79qC-w&s";

export const BACKEND_URL = "http://127.0.0.1:8000";
export const DEVELOP_URL = "";

export const MAJORS: Major[] = [
  { label: "Informatics", value: "informatics" },
  { label: "Automatization", value: "automatization" },
  { label: "Engineering", value: "engineering" },
  { label: "Networking & Communication", value: "networking" },
  { label: "Mechanics", value: "mechanics" },
];
