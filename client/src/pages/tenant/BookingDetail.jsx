import { useMutation, useQuery } from "react-query";
import Booking from "../../components/Booking";
import { API } from "../../config/api";
import { useNavigate, useParams } from "react-router";
import { Button } from "react-bootstrap";
import { useEffect } from "react";

export default function BookingDetailPage() {
    const navigate =useNavigate()
    const p = useParams()
    let { data: Transaction } = useQuery("TransactionDetailCache", async () => {
    const response = await API.get(`/transaction/${p.id}`);
    console.log(response.data.data);
    return response.data.data;
    });

    const handleBuy = useMutation(async () => {
    try {

      const response = await API.get(`/getpayment/${p.id}`);
      
      const token = response.data.data.token;

      window.snap.pay(token, {
        onSuccess: function (result) {
            console.log(result);
            navigate("/bookinglist");
        },
        onPending: function (result) {
            console.log(result);
            navigate("/bookinglist");
        },
        onError: function (result) {
            console.log(result);
            navigate("/bookinglist");
        },
        onClose: function () {
          alert("tutup")
        },
      });
    } catch (error) {
      console.log(error)
    }
  })

useEffect (() => {
        
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    const myMidtransClientKey = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;

    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
}, []);



    return (
        <>
        <Booking data={Transaction} page="Booking" />
        {Transaction?.status === "pending" ? (
                <div className="d-flex justify-content-end mt-4" style={{marginRight:"12rem"}}>
                    <Button onClick={() => handleBuy.mutate()} className="px-5">PAY</Button>
                </div>       
            ) : (
                <span></span>
        )} 
        </>
        
    )
}