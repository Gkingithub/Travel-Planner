import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "./Dashboard/Dashboard.css";
import { getMyTrips, getTripDetails } from "../../service/tripService";

function MyTrips() {

  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    loadTrips();
  }, []);


  const loadTrips = async () => {

    try {

      setLoading(true);

      const response = await getMyTrips();

      if (response.success) {
        setTrips(response.data);
      }
      else {
        Swal.fire(
          "Error",
          response.message,
          "error"
        );
      }

    }
    catch(error){

      Swal.fire(
        "Error",
        "Unable to load trips.",
        "error"
      );

    }
    finally{
      setLoading(false);
    }

  };


  const handleView = async(tripId)=>{

    try{

      const response = await getTripDetails(tripId);


      if(response.success){

        const trip = response.data;


        let itineraryHTML = "";


        trip.itineraries.forEach(day=>{

          itineraryHTML += `
          
          <div style="
             text-align:left;
             margin-bottom:15px;
             padding:10px;
             border-bottom:1px solid #ddd;
          ">

          <h4>Day ${day.dayNumber}</h4>

          <p>
          🌅 Morning:
          ${day.morning}
          </p>

          <p>
          ☀️ Afternoon:
          ${day.afternoon}
          </p>

          <p>
          🌙 Evening:
          ${day.evening}
          </p>

          <p>
          💰 Cost:
          Rs. ${day.estimatedCost}
          </p>

          </div>

          `;

        });


        Swal.fire({

          title: `${trip.destinationName} Trip`,

          html:`

          <p>
          📅 Date:
          ${new Date(trip.travelDate).toLocaleDateString()}
          </p>

          <p>
          👥 Travellers:
          ${trip.travellers}
          </p>

          <p>
          🚗 Transport:
          ${trip.transportation}
          </p>

          <p>
          🏨 Hotel:
          ${trip.hotelCategory}
          </p>

          <hr/>

          ${itineraryHTML}

          `,

          width:"700px",

          confirmButtonText:"Close"

        });


      }


    }
    catch(error){

      Swal.fire(
        "Error",
        "Unable to fetch trip details.",
        "error"
      );

    }

  };



  const handleCancel=(tripId)=>{

    Swal.fire({

      title:"Cancel Trip?",

      text:"Are you sure you want to cancel this trip?",

      icon:"warning",

      showCancelButton:true,

      confirmButtonText:"Yes, Cancel"

    }).then((result)=>{

      if(result.isConfirmed){

        Swal.fire(
          "Cancelled",
          "Trip cancellation API can be connected here.",
          "success"
        );

      }

    });

  };



  return (

    <div className="page">

      <h1 className="page-title">
        My Trips
      </h1>


      {
      loading ?

      <h2>
        Loading...
      </h2>


      :

      trips.length===0 ?

      <h2>
        No trips found.
      </h2>


      :

      <div className="trip-grid">


      {
      trips.map((trip)=>(


      <div
      className="trip-card"
      key={trip.tripId}
      >


      <img

      src={
        trip.destination?.imageUrl
        ?
        `http://localhost:5055${trip.destination.imageUrl}`
        :
        "/placeholder.jpg"
      }

      alt={trip.destination?.name}

      className="trip-image"

      />


      <div className="trip-content">


      <div className="trip-header">


      <h3>
      {trip.destination?.name}
      </h3>


      <span className="status">
      Upcoming
      </span>


      </div>



      <p>
      📅 <strong>Date:</strong>{" "}
      {
      new Date(trip.travelDate)
      .toLocaleDateString()
      }
      </p>


      <p>
      💰 <strong>Budget:</strong>
      Rs. {trip.budget}
      </p>


      <p>
      ⏳ <strong>Days:</strong>
      {trip.days}
      </p>


      <p>
      🚗 <strong>Transport:</strong>
      {trip.transportation}
      </p>


      <p>
      🏨 <strong>Hotel:</strong>
      {trip.hotelCategory}
      </p>



      <div className="trip-buttons">


      <button

      className="view-btn"

      onClick={()=>handleView(trip.tripId)}

      >

      View

      </button>



      <button

      className="cancel-btn"

      onClick={()=>handleCancel(trip.tripId)}

      >

      Cancel

      </button>


      </div>


      </div>


      </div>


      ))
      }


      </div>

      }


    </div>

  );

}


export default MyTrips;