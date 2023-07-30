import { useQuery } from "react-query";
import { API } from "../../config/api";
import Booking from "../../components/Booking";

export default function HistorylistOwner() {
    let { data: HistoryList } = useQuery("HIstorylistOwnerCache", async () => {
    const response = await API.get(`transactions-owner`);
    console.log(response.data.data);
    return response.data.data;
    });

    return (
        <>
        {
            HistoryList?.map((data, i)=>(
                <>
                <div className="mt-5">
                <Booking key={i} data={data} page="INVOICE" />
                </div>
                </>

            ))
        }
        </>
    )
}