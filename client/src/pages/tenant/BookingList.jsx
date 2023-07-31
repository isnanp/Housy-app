import { useQuery } from "react-query";
import { API } from "../../config/api";
import Booking from "../../components/Booking";


export default function Bookinglist() {
    let { data: BookingData } = useQuery("BookinglistCache", async () => {
    const response = await API.get(`/transactions-tenant`);
    console.log(response.data.data);
    return response.data.data;
    });


    return (
        <>
        {
            BookingData?.map((data, i)=>(
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