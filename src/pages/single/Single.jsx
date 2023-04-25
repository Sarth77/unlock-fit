import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import { useLocation } from "react-router-dom";
import WeightList from "../weightreport/WeightList";
const Single = () => {
  const location = useLocation();
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src={
                  location.state.picture
                    ? location.state.picture
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{location.state.name}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{location.state.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">BMI:</span>
                  <span className="itemValue">{location.state.bmi}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Gender:</span>
                  <span className="itemValue">{location.state.gender}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Weight:</span>
                  <span className="itemValue">{location.state.weight}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Weight Record ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Weight Report</h1>
          <WeightList userid={location.pathname} />
        </div>
      </div>
    </div>
  );
};

export default Single;
