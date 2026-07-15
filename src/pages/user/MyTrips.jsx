import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "./Dashboard/Dashboard.css";

import {
  getMyTrips,
  getTripDetails,
  completeTrip,
  deleteTrip
} from "../../service/tripService";


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
    catch (error) {

      Swal.fire(
        "Error",
        "Unable to load trips.",
        "error"
      );

    }
    finally {

      setLoading(false);

    }

  };



  // ============================
  // VIEW DETAILS
  // ============================

  const handleView = async (tripId) => {

    try {

      const response = await getTripDetails(tripId);


      if (!response.success) {

        Swal.fire(
          "Error",
          response.message,
          "error"
        );

        return;
      }


      const trip = response.data;


      let itineraryHTML = "";


      if (trip.itineraries && trip.itineraries.length > 0) {


        trip.itineraries.forEach(day => {


          itineraryHTML += `

          <div style="
          text-align:left;
          padding:12px;
          border-bottom:1px solid #ddd;
          margin-bottom:10px;">


          <h4>
          Day ${day.dayNumber}
          </h4>


          <p>
          <strong>Morning:</strong>
          ${day.morning || "-"}
          </p>


          <p>
          <strong>Afternoon:</strong>
          ${day.afternoon || "-"}
          </p>


          <p>
          <strong>Evening:</strong>
          ${day.evening || "-"}
          </p>


          <p>
          <strong>Estimated Cost:</strong>
          Rs. ${day.estimatedCost}
          </p>


          </div>

          `;


        });


      }
      else {

        itineraryHTML =
          "<p>No itinerary found.</p>";

      }



      Swal.fire({

        title:
          `${trip.destination?.name} Trip`,


        width: "700px",


        html: `

        <p>
        <strong>Date:</strong>
        ${new Date(trip.travelDate)
            .toLocaleDateString()}
        </p>


        <p>
        <strong>Status:</strong>
        ${trip.status}
        </p>


        <p>
        <strong>Travellers:</strong>
        ${trip.travellers}
        </p>


        <p>
        <strong>Transportation:</strong>
        ${trip.transportation}
        </p>


        <p>
        <strong>Hotel:</strong>
        ${trip.hotelCategory}
        </p>


        <hr>


        ${itineraryHTML}

        `,


        confirmButtonText: "Close"

      });


    }
    catch (error) {

      console.log(error);

      Swal.fire(
        "Error",
        "Unable to fetch trip details.",
        "error"
      );

    }

  };





  // ============================
  // COMPLETE TRIP
  // ============================

  const handleComplete = async (tripId) => {


    const result = await Swal.fire({

      title: "Complete Trip?",

      text: "Mark this trip as completed?",

      icon: "question",

      showCancelButton: true,

      confirmButtonText: "Yes, Complete"

    });



    if (!result.isConfirmed)
      return;



    try {


      const response =
        await completeTrip(tripId);



      if (response.success) {


        Swal.fire(
          "Completed",
          "Trip marked as completed.",
          "success"
        );


        loadTrips();


      }


    }
    catch (error) {


      Swal.fire(
        "Error",
        "Unable to update trip.",
        "error"
      );


    }


  };





  // ============================
  // DELETE / CANCEL TRIP
  // ============================

  const handleCancel = async (tripId) => {


    const result = await Swal.fire({

      title: "Cancel Trip?",

      text: "This will delete the trip permanently.",

      icon: "warning",

      showCancelButton: true,

      confirmButtonText: "Yes, Delete"

    });



    if (!result.isConfirmed)
      return;



    try {


      const response =
        await deleteTrip(tripId);



      if (response.success) {


        Swal.fire(
          "Deleted",
          "Trip deleted successfully.",
          "success"
        );


        setTrips(prevTrips =>
    prevTrips.filter(trip => trip.tripId !== tripId)
  );
      }


    }
    catch (error) {


      Swal.fire(
        "Error",
        "Unable to delete trip.",
        "error"
      );


    }


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

          trips.length === 0 ?

            <h2>
              No trips found.
            </h2>


            :


            <div className="trip-grid">


              {

                trips.map((trip) => (


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



                        <span
                          className={`status ${trip.status?.toLowerCase()}`}
                        >

                          {trip.status}

                        </span>


                      </div>




                      <p>
                        <strong>Date:</strong>{" "}
                        {
                          new Date(trip.travelDate)
                            .toLocaleDateString()
                        }
                      </p>



                      <p>
                        <strong>Budget:</strong>
                        Rs. {trip.budget}
                      </p>



                      <p>
                        <strong>Days:</strong>
                        {trip.days}
                      </p>



                      <p>
                        <strong>Transport:</strong>
                        {trip.transportation}
                      </p>



                      <p>
                        <strong>Hotel:</strong>
                        {trip.hotelCategory}
                      </p>




                      <div className="trip-buttons">



                        <button

                          className="view-btn"

                          onClick={() =>
                            handleView(trip.tripId)
                          }

                        >

                          View

                        </button>




                        <button

                          className="complete-btn"

                          disabled={
                            trip.status === "Completed"
                          }

                          onClick={() =>
                            handleComplete(trip.tripId)
                          }

                        >

                          Complete

                        </button>




                        <button

                          className="cancel-btn"

                          onClick={() =>
                            handleCancel(trip.tripId)
                          }

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