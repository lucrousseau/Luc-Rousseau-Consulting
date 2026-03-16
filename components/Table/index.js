import classNames from "classnames";

export default function Table({ headers, rows, columnKeys, rowHeaderKey, className, ...props }) {
  if (!headers || !rows?.length) {
    return null;
  }

  /* eslint-disable security/detect-object-injection -- keys from columnKeys/headers, not user input */
  const keys =
    columnKeys && columnKeys.length > 0
      ? columnKeys.filter((key) => headers[key] != null)
      : Object.keys(headers);
  const headerKey = rowHeaderKey != null && keys.includes(rowHeaderKey) ? rowHeaderKey : keys[0];

  return (
    <div className={classNames("component component__table", className)} {...props}>
      <div className="component__table__wrapper">
        <table className="component__table__table">
          <thead>
            <tr>
              {keys.map((key) => (
                <th
                  key={key}
                  scope="col"
                  className={
                    key === headerKey ? "component__table__th-dimension" : "component__table__th"
                  }
                >
                  {headers[key]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                {keys.map((key) => {
                  const isRowHeader = key === headerKey;
                  const CellTag = isRowHeader ? "th" : "td";
                  return (
                    <CellTag
                      key={key}
                      scope={isRowHeader ? "row" : undefined}
                      className={
                        isRowHeader ? "component__table__th-dimension" : "component__table__td"
                      }
                      data-label={headers[key]}
                    >
                      {row[key]}
                    </CellTag>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
/* eslint-enable security/detect-object-injection */
