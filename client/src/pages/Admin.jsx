import '../styles/home.css';
import '../styles/app.css';
import Navigation from '../components/Navigation';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

function Admin() {
  
  return (
    <>
      <Navigation />
      <div className="admin view">
      </div>
    </>
  );
}

export default Admin;