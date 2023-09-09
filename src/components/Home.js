import React, { useState, useEffect } from 'react';
import './Home.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Main from './Main';

export default function Home() {
  let currentDate = new Date().toJSON().slice(0, 10);
  const params = useParams();
  const mail = params.mail;
  const [from, setFrom] = useState('IITH');
  const [to, setTo] = useState('RGIA');
  const [rdate, setRdate] = useState('');
  const [rtime, setRtime] = useState('');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  function convertTimeToNumeric(timeString) {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    return date.getHours() * 60 + date.getMinutes();
  }

  const searchDb = (event) => {
    event.preventDefault();
    const formData = {
      mail,
      from,
      to,
      rdate,
      rtime: convertTimeToNumeric(rtime),
    };
    axios
      .post('http://localhost:4000/api/data', formData)
      .then((response) => {
        console.log("This is response data" + response.data);
        setUserData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      {userData ? (
        <Main userData={userData} />
      ) : (
        <div id="root">
          <div className="navbar">
            <div className="app-name">CAB SHARING</div>
            <div className="email-box">{mail}</div>
          </div>
          <div className="home-cont">
            <form>
              <label htmlFor="from">FROM</label>
              <br />
              <select id="from" value={from} onChange={(event) => setFrom(event.target.value)}>
                <option value="IITH">IITH</option>
                <option value="RGIA">RGIA</option>
                <option value="SECUNDRABAD">SECUNDRABAD</option>
                <option value="HYD">HYD</option>
              </select>
              <br />

              <label htmlFor="to">TO</label>
              <br />
              <select id="to" value={to} onChange={(event) => setTo(event.target.value)}>
                <option value="RGIA">RGIA</option>
                <option value="IITH">IITH</option>
                <option value="SECUNDRABAD">SECUNDRABAD</option>
                <option value="HYD">HYD</option>
              </select>
              <br />

              <label htmlFor="date">DATE</label>
              <br />
              <input type="date" id="date" value={rdate} min={currentDate} onChange={(event) => setRdate(event.target.value)} />
              <br />

              <label htmlFor="time">TIME</label>
              <br />
              <input type="time" id="time" value={rtime} onChange={(event) => setRtime(event.target.value)} />
              <br />

              <input type="submit" value="GO" id="button" onClick={searchDb} />
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
