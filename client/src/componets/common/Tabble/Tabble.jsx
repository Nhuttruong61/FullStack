import { memo } from "react";
import ReactTableUI from "react-table-ui";
function Tabble({ data, columns, title }) {
  return <ReactTableUI title={title} data={data} columns={columns} />;
}

export default memo(Tabble);
