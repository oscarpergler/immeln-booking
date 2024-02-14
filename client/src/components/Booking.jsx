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

        const bookingsThisMonth = [];
        /* 
            Limit the data to relevant bookings, 
            hopefully this helps reducing the amout of needed iterations  
            31*n        ---->       n + 31*(n/12) 
            assuming each month has equal amount of bookings
        */
        for (let i = 0; i < bookings.length; i++){
            let bookingMonth = (bookings[i].from).split(' ')[1];
            let bookingMonthIndex = MONTHS.indexOf(bookingMonth)
            if (bookingMonthIndex === month){ // If currently selected month is equal to the month of the booking, this is where we split the array
                bookingsThisMonth.push(bookings.slice(bookings.indexOf(bookings[i]))[0]);
            }
        }

        console.log(bookingsThisMonth);
        
        let bookedSeveralDays;
        let bookedToUsername;
        let bookedToDate;
        let today = new Date();
        let todayFormatted = convertDateFormat(today.getDate(), today.getMonth(), today.getFullYear());

        return getDaysThisMonth().map((day) => {

            let booked = false;
            let name = "";
            let hex = "";
            let note = "";
            let isToday = false;

            if (todayFormatted === day){
                isToday = true;
            } 

            for (let i = 0; i < bookingsThisMonth.length; i++){
                if ((bookingsThisMonth[i].from) === day){
                    
                    booked = true;
                    name = bookingsThisMonth[i].username;
                    hex = bookingsThisMonth[i].hex;
                    note = bookingsThisMonth[i].note;

                    if (bookingsThisMonth[i].from !== bookingsThisMonth[i].to){
                        bookedSeveralDays = true;
                        bookedToUsername = bookingsThisMonth[i].username;
                        hex = bookingsThisMonth[i].hex;
                        note = bookingsThisMonth[i].note;
                        bookedToDate = bookingsThisMonth[i].to;
                    }
                } 
            }

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
                    hex={hex}
                    note={note}
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
