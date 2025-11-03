import React, { memo } from "react";
import "./OptimizedTable.scss";

function OptimizedTable({ title, data = [], columns = [] }) {
  const totalWidth = columns.reduce((sum, col) => sum + (col.width || 0), 0);

  return (
    <div className="optimized-table-container">
      {title && <h3 className="optimized-table-title">{title}</h3>}
      <div className="optimized-table-wrapper">
        <table className="optimized-table">
          <thead>
            <tr>
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  style={{
                    width: `${col.width}%`,
                    minWidth: `${col.width}%`,
                    maxWidth: `${col.width}%`,
                  }}
                  className={col.align ? `align-${col.align}` : ""}
                >
                  {col.Header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((row, rowIdx) => (
                <tr key={rowIdx}>
                  {columns.map((col, colIdx) => {
                    const value = col.accessor ? row[col.accessor] : null;
                    const cellContent = col.Cell
                      ? col.Cell({ value, row })
                      : value;

                    return (
                      <td
                        key={colIdx}
                        style={{
                          width: `${col.width}%`,
                          minWidth: `${col.width}%`,
                          maxWidth: `${col.width}%`,
                        }}
                        className={col.align ? `align-${col.align}` : ""}
                      >
                        {cellContent}
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="empty-message">
                  Không có dữ liệu
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default memo(OptimizedTable);
