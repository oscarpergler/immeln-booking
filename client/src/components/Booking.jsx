import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useProtectedEndpoints from "../hooks/useProtectedEndpoints";
import Tile from './Tile.jsx'
import CustomButton from './CustomButton.jsx';
import '../styles/booking.css';

function Booking() {

    const MONTHS = [
        "januari", "februari", "mars", "april", 
        "maj", "juni", "juli", "augusti", 
        "september", "oktober", "november", "december"
    ];

    const axiosPrivate = useProtectedEndpoints();
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(new Date())
    var year = selectedDate.getFullYear();
    var month = selectedDate.getMonth();
    var firstDay = new Date(year, month, 1).getDate();
    var lastDay = new Date(year, month + 1, 0).getDate();

    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        axiosPrivate.get('/bookings', { // Should send httpOnly cookie for authorization, and refresh if accesstoken is invalid
            withCredentials: true
        })
        .then (response => {
            setBookings(response.data)
        })
        .catch (error => {
            if (error.response.status === 401){
                console.log("Unauthorized API call");
                navigate('/login');
            } else throw new Error(`${error.response.status} - ${error.response.statusText}`)  
        })
    }, []);

    const handleNext = () => {
        setSelectedDate(new Date(year, month + 1, 1));
    }

    const handlePrevious = () => {
        setSelectedDate(new Date(year, month - 1, 1));
    }

    const convertDateFormat = (date, month, year) => {
        return [date, MONTHS[month], year].join(' ');
    }

    const getDaysThisMonth = () => {
        let daysThisMonth = [];
        for (let i = 0; i < lastDay; i++){
            daysThisMonth[i] = convertDateFormat((i + firstDay), month, year);
        }
        return daysThisMonth;
    }

    // TODO: Refactor
    const renderTiles = () => {   
        
        let bookedSeveralDays;
        let bookedToUsername;
        let bookedToDate;
        let today = new Date();
        let todayFormatted = convertDateFormat(today.getDate(), today.getMonth(), today.getFullYear());

        return getDaysThisMonth().map((day) => {

            let booked = false;
            let name = "";
            let isToday = false;

            if (todayFormatted === day){
                isToday = true;
            } 

            bookings.forEach((booking) =>{
                if ((booking.from) === day){
                    
                    booked = true;
                    name = booking.username;

                    if (booking.from !== booking.to){
                        bookedSeveralDays = true;
                        bookedToUsername = booking.username;
                        bookedToDate = booking.to;
                    }
                } 
            })

            if (bookedSeveralDays){
                booked = true;
                name = bookedToUsername;
                if (bookedToDate === day){
                    bookedSeveralDays = false;
                }
            }

            return(
                <Tile 
                    key={day}
                    date={day}
                    isBooked={booked}
                    username={name}
                    today={isToday}
                />
            );

        })
    }

    return (
        <>
        <div className="calendar-container">
            <div className="month-indicator">
                {MONTHS[month]}, {year}
            </div>
            <div className="calendar">
                <div className="date-grid">
                    <div className="tile week-day">Mån</div>
                    <div className="tile week-day">Tis</div>
                    <div className="tile week-day">Ons</div>
                    <div className="tile week-day">Tor</div>
                    <div className="tile week-day">Fre</div>
                    <div className="tile week-day">Lör</div>
                    <div className="tile week-day">Sön</div>
                    {renderTiles()}
                </div>
            </div>
            <div className="month-navigation">
                <CustomButton 
                    onClick={handlePrevious}
                    content="föregående" 
                    width="150px"
                />
                <CustomButton 
                    onClick={handleNext}
                    content="nästa" 
                    width="150px"
                />
            </div>
        </div>
        </>
    );
}

export default Booking;
