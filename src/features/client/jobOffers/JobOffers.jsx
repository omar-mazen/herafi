import { formatDate, formatISO } from "date-fns";
import MoreInfoIcon from "../../../icons/MoreInfoIcon";
import ThreeDots from "../../../icons/ThreeDots";
import ConfirmDelete from "../../../ui/ConfirmDelete";
import FullPageLoading from "../../../ui/FullPageLoading";
import Menu from "../../../ui/Menu";
import Modal from "../../../ui/Modal";
import Pagenation from "../../../ui/Pagenation";
import Table from "../../../ui/Table";
import TrashIcon from "../../../ui/TrashIcon";
import useGetAllJobOffers from "./useGetAllJobOffers";
import useDeleteJobOffer from "./useDeleteJobOffer";
import { useNavigate } from "react-router-dom";

export default function JobOffers() {
  const navigate = useNavigate();
  const { data, isLoading } = useGetAllJobOffers();
  const { deleteJobOffer, isLoading: isDeleting } = useDeleteJobOffer();
  if (isLoading) return <FullPageLoading />;
  console.log(data?.data);
  return (
    <Modal bottomSheetScreens={[]} modalCloseScreenSize={[]}>
      <Menu>
        <div className=" container">
          <p className=" mb-10 mt-5 text-h2">عروض العمل الخاصة بك </p>
          <Table
            footer={
              data.latestPage ? <Pagenation total={data.latestPage} /> : null
            }
          >
            <Table.Head>
              <Table.Row>
                <Table.Cell head={true}>العنوان</Table.Cell>
                <Table.Cell head={true}>الوصف</Table.Cell>
                <Table.Cell head={true}>تاريخ الانشاء</Table.Cell>
                <Table.Cell head={true}></Table.Cell>
              </Table.Row>
            </Table.Head>
            {data?.data?.length > 0 && (
              <Table.Body>
                {data.data.map((offer, i) => (
                  <>
                    <Table.Row key={i}>
                      <Table.Cell>{offer.title}</Table.Cell>
                      <Table.Cell>{offer.description} </Table.Cell>
                      <Table.Cell>
                        {formatISO(offer.created_at, {
                          representation: "date",
                        })}
                      </Table.Cell>
                      <Table.Cell>
                        <Menu.Toggle name={`opens-${offer?.id}`}>
                          <ThreeDots />
                        </Menu.Toggle>
                      </Table.Cell>
                    </Table.Row>
                    <Menu.List name={`opens-${offer?.id}`}>
                      <Modal.Open opens={`delete-${offer?.id}`}>
                        <Menu.Item icon={<TrashIcon size={20} />}>
                          حذف
                        </Menu.Item>
                      </Modal.Open>
                      <Menu.Item
                        onClick={() =>
                          navigate(`/client/job-offer/${offer?.id}`)
                        }
                        icon={<MoreInfoIcon size={20} />}
                      >
                        المزيد
                      </Menu.Item>
                    </Menu.List>
                    <Modal.Window name={`delete-${offer?.id}`}>
                      <ConfirmDelete
                        resourceName={`طلبك " ${offer?.title} "`}
                        onConfirm={() => deleteJobOffer(offer?.id)}
                      />
                    </Modal.Window>
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
