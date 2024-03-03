import { useDispatch } from "react-redux";
const withBase = (Componet) => (prop) => {
  const dispatch = useDispatch();
  return <Componet {...prop} dispatch={dispatch} />;
};
export default withBase;
