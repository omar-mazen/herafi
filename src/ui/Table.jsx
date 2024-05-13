export default function Table({ children, footer }) {
  return (
    <>
      <div className="">
        <div
          className={`w-full overflow-x-auto whitespace-nowrap rounded-2xl border-2 border-secondary-background lg:mb-0 ${
            footer ? "rounded-b-none border-b-0" : ""
          }`}
        >
          <table className=" w-full table-auto text-left text-small">
            {children}
          </table>
        </div>
        {footer && (
          <div className="h-min w-full rounded-b-2xl bg-secondary-background px-4 text-small">
            {footer}
          </div>
        )}
      </div>
    </>
  );
}
function Head({ children }) {
  return (
    <thead className="text-nowrap bg-secondary-background ">{children}</thead>
  );
}
function Cell({ children, head, bold }) {
  if (head)
    return (
      <th className="max-w-[1500px] overflow-hidden text-ellipsis text-nowrap px-8 py-4 text-start">
        {children}
      </th>
    );
  else
    return (
      <td
        className={`max-w-[150px] overflow-hidden text-ellipsis text-nowrap px-8 py-4 text-start last-of-type:float-left ${
          bold ? "font-semibold" : "font-normal"
        }`}
      >
        {children}
      </td>
    );
}
function Body({ children }) {
  return <tbody>{children}</tbody>;
}
function Row({ children, onClick }) {
  return (
    <tr
      onClick={() => onClick?.()}
      className={`border-secondary-background odd:border-b even:border-b last-of-type:border-0 ${
        onClick ? "cursor-pointer" : ""
      }`}
    >
      {children}
    </tr>
  );
}
function Footer({ children }) {
  return (
    <tfoot className="w-full appearance-none bg-secondary-background ">
      {children}
    </tfoot>
  );
}
Table.Head = Head;
Table.Row = Row;
Table.Cell = Cell;
Table.Body = Body;
Table.Footer = Footer;
