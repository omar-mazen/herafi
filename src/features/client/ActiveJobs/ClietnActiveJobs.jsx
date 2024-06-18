import { formatISO } from "date-fns";
import FullPageLoading from "../../../ui/FullPageLoading";
import Menu from "../../../ui/Menu";
import Modal from "../../../ui/Modal";
import Pagenation from "../../../ui/Pagenation";
import Table from "../../../ui/Table";
import { Link } from "react-router-dom";
import useClientGetActiveJobs from "./useClientGetActiveJobs";

export default function ClientActiveJobs() {
  const { data, isLoading } = useClientGetActiveJobs();
  if (isLoading) return <FullPageLoading />;
  console.log(data?.data);
  return (
    <Modal bottomSheetScreens={[]} modalCloseScreenSize={[]}>
      <Menu>
        <div className=" container">
          <p className=" mb-10 mt-5 text-h2">الاعمال النشطه </p>
          <Table
            footer={
              data?.latestPage ? <Pagenation total={data?.latestPage} /> : null
            }
          >
            <Table.Head>
              <Table.Row>
                <Table.Cell head={true}>العنوان</Table.Cell>
                <Table.Cell head={true}>الوصف</Table.Cell>
                <Table.Cell head={true}>تاريخ البدأ</Table.Cell>
                <Table.Cell head={true}>تاريخ الانتهاء</Table.Cell>
                <Table.Cell head={true}></Table.Cell>
              </Table.Row>
            </Table.Head>
            {data?.data?.length > 0 && (
              <Table.Body>
                {data.data.map((offer, i) => (
                  <>
                    <Table.Row key={i}>
                      <Table.Cell>
                        <Link to={`/client/job/active/${offer.id}`}>
                          {offer.title}
                        </Link>
                      </Table.Cell>
                      <Table.Cell>{offer.description} </Table.Cell>
                      <Table.Cell>
                        {formatISO(offer.start_date, {
                          representation: "date",
                        })}
                      </Table.Cell>
                      <Table.Cell>
                        {formatISO(offer.end_date, {
                          representation: "date",
                        })}
                      </Table.Cell>
                      <Table.Cell></Table.Cell>
                    </Table.Row>
                  </>
                ))}
              </Table.Body>
            )}
          </Table>
        </div>
      </Menu>
    </Modal>
  );
}
