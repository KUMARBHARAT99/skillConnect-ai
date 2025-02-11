import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import "./FindService.css";

const FindServices = () => {
  const [services, setServices] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        console.log("Fetching services from Firestore...");
        const querySnapshot = await getDocs(collection(db, "services"));
        const servicesList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        console.log("Services Fetched:", servicesList); // ✅ Debugging 
        setServices(servicesList);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, [db]);

  return (
    <div className="find-service-container">
      <h2>Available Services</h2>
      {services.length > 0 ? (
        <ul className="service-list">
          {services.map((service) => (
            <li key={service.id} className="service-card">
              <h3>{service.name}</h3>
              <p>Category: {service.category}</p>
              <p>Contact: {service.email}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No services available yet.</p>
      )}
    </div>
  );
};

export default FindServices;


