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
    var today = new Date();
    var firstDay = new Date(year, month, 1).getDate();
    var lastDay = new Date(year, month + 1, 0).getDate();
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        axiosPrivate.post('/bookings', 
        {
            requestedYear: year 
        },
        { withCredentials: true })
        .then (response => {
            setBookings(response.data)
        })
        .catch (error => {
            if (error.response.status === 401){
                console.log("Unauthorized API call");
                navigate('/login');
            } else throw new Error(`${error.response.status} - ${error.response.statusText}`)  
        })
    }, [year]);

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
            daysThisMonth[i] = i + firstDay;
        }
        return daysThisMonth;
    }

    const renderTiles = () => {   

        let hex = "";
        let note = "";
        let username = "";
        let booked = false;

        return getDaysThisMonth().map((day) => {

            let isToday = day === today.getDate() && month === today.getMonth();

            for (let i = 0; i < bookings.length; i++){

                // special-case när en bokning överlappar två månader
                if (bookings[i]?.from?.month === month && bookings[i]?.to?.month === month+1){
                    // här är endast to-datumet intressant eftersom att from-datumet är från förra månaden
                    if (bookings[i]?.to?.day >= day){
                        hex = bookings[i]?.hex;
                        note = bookings[i]?.note;
                        username = bookings[i]?.user;
                        booked = true;
                    } 
                }

                // om vi hittar ett from datum som matchar utgår vi ifrån att alla datum efter nu är bokade
                if (bookings[i]?.from?.month === month+1 && bookings[i]?.from?.day === day){
                    hex = bookings[i]?.hex;
                    note = bookings[i]?.note;
                    username = bookings[i]?.user;
                    booked = true;
                }

                // flaggan som säger att datumen inte bör vara bokade längre
                if (bookings[i]?.to?.day === day-1){
                    hex = "";
                    note = "";
                    username = "";
                    booked = false;
                }
                
            }
            return(
                <Tile 
                    date={convertDateFormat(day, month, year)}
                    hex={hex}
                    note={note}
                    isBooked={booked}
                    username={username}
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
