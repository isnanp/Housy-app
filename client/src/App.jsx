
import { Route, Routes, useNavigate } from 'react-router-dom'
import NavbarCustom from './components/NavbarHeader'
import HomeTenant from './pages/tenant/HomeTenant'
import BookingDetailPage from './pages/tenant/BookingDetail'
import { useContext, useEffect, useState } from 'react'
import { API, setAuthToken } from './config/api'
import { UserContext } from './context/usercontext'
import PropertyDetail from './pages/tenant/PropertyDetail'
import ProfilePage from './pages/Profile'
import TransactionList from './pages/owner/TransactionList'
import AddProperties from './pages/owner/AddProperties'
import Bookinglist from './pages/tenant/BookingList'
import { useQuery } from 'react-query'
import HistorylistOwner from './pages/owner/History'
import { PrivateRoute, PrivateRouteOwner } from './components/privateRoute'


export default function App() {
  const [state, dispatch] = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()


  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth")
      console.log("Check user success : ", response)
      let payload =response.data.data;
      payload.token = localStorage.token;

      dispatch({
        type : "USER_SUCCESS",
        payload,
      })
      setIsLoading(false)

    } catch (error) {
      console.log("Check user failed : ", error);
      dispatch({
        type: "AUTH_ERROR",
      })
      navigate("/")
      setIsLoading(false)
      }
    }
    
    useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      checkUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoading && !state.isLogin) {
      navigate("/");
    }
  }, [isLoading]);

    //filter
    const [search, setSearch] = useState("")
    const [Type, setBtnType] = useState(null);
    const [Bedroom, setBedroom] = useState(null);
    const [Bathroom, setBathroom] = useState(null);
    const [Price, setPrice] = useState("");
    const [Properties, setProperties] = useState([]);
    
    let { data: Propertiesfilter, refetch: PropertiesRefecth } = useQuery("PropertiesHomeCache", async () => {
    const response = search !== "" && Type !== null && Bedroom !== null && Bathroom !== null && Price !== null ? (
        await API.get(`/filter-city-multy?type=${Type}&bathrooms=${Bathroom}&bedrooms=${Bedroom}&city=${search}&price=${Price}}`)
    ) : search !== "" && Type === null ? (
        await API.get(`filter-city?city=${search}`)
    ) : search === "" && Type !== null && Bedroom !== null && Bathroom !== null && Price !== null ? (
        await API.get(`/filter-multy?type=${Type}&bathrooms=${Bathroom}&bedrooms=${Bedroom}&price=${Price}`)
    ) :(await API.get(`/properties`))
    
    console.log(response.data.data);
    return response.data.data;
    });


    useEffect(() => {
        setProperties(Propertiesfilter)
    },[Propertiesfilter])

  return (
    <>
      {isLoading ? null : (
      <>
        <NavbarCustom search={search} refetch={PropertiesRefecth} setSearch={setSearch} />
        <Routes>
          <Route path='/' element={<HomeTenant Price={Price} Bedroom={Bedroom} Bathroom={Bathroom} setSearch={setSearch} data={Properties} refetch={PropertiesRefecth} type={Type} setBtnType={setBtnType} setBedroom={setBedroom} setBathroom={setBathroom} setPrice={setPrice} />} />
          <Route path='/property-detail/:id' element={<PropertyDetail /> } />
          <Route element={<PrivateRoute /> } >
            <Route path='/details/:id' element={<BookingDetailPage /> } />
            <Route path='/profile/tenant' element={<ProfilePage /> } />
            <Route path='/bookinglist' element={<Bookinglist /> } />   
          </ Route>
          <Route element={<PrivateRouteOwner />}>
            <Route path='/history-list-owner' element={<HistorylistOwner /> } />
            <Route path='/transactions' element={<TransactionList /> } />
            <Route path='/profile/owner' element={<ProfilePage /> } />
            <Route path='/addProperty' element={<AddProperties /> } />
          </Route>
        </Routes>
      </>
      )}
    </>
  );
}
