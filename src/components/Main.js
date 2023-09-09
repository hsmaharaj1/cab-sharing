import './Main.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Main(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);

        const from = props.userData.from;
        const to = props.userData.to;
        const rdate = props.userData.rdate;
        const response = await axios.get(`http://localhost:4000/api/data?from=${from}&to=${to}&rdate=${rdate}`);

        if (mounted) {
          setData(response.data);
          console.log('Fetched Successfully', response.data.length);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (mounted) {
      fetchData();
    }

    return () => {
      mounted = false;
    };
  }, [props.userData]);

  const handleMailClick = (mail) => {
    window.location.href = `mailto:${mail}`;
  };

  function convertMinutesToHHMM(minutes) {
    var hours = Math.floor(minutes / 60);
    var remainingMinutes = minutes % 60;

    var formattedHours = hours.toString().padStart(2, '0');
    var formattedMinutes = remainingMinutes.toString().padStart(2, '0');

    return formattedHours + ':' + formattedMinutes;
  }
  function renderData() {
    if (loading) {
      return <p className="items">Loading...</p>;
    }

    if (data.length === 1 || data.length === 0) {
      return <p className="items">OPPS!! No Match Found</p>;
    }

    return data.map((item) => {
      if (item.mail !== props.userData.mail) {
        return (
          <div className="items" key={item._id}>
            <p>
              Mail: <a href={`mailto:${item.mail}`} onClick={() => handleMailClick(item.mail)}>{item.mail}</a>
            </p>
            <p>Date: {item.rdate}</p>
            <p>Time: {convertMinutesToHHMM(item.rtime)}</p>
            <div className="btn-connect">CONNECT</div>
            <hr />
          </div>
        );
      } else {
        return null;
      }
    });
  }
  return (
    <div id="root">
      <div className="navbar">
        <div className="app-name">CAB SHARING</div>
        <div className="email-box">{props.userData.mail}</div>
        <div className="info-box">
          <div className="info-text">{props.userData.from}</div>
          <span className="material-symbols-outlined white-color">double_arrow</span>
          <div className="info-text">{props.userData.to}</div>
        </div>
      </div>
      <div className="data-cont">{renderData()}</div>
    </div>
  );


}
