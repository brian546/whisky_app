import React, { Component } from "react";
import ImageUpload from "../components/imageload";
import axios from "axios";
import Bottle from "../components/Bottle";
import FilterSliderList from "../components/FilterSlider";
class Home extends Component {
  state = {
    selectedFile: null,
    fileURL: null,
    whisky_index_predicted: null,
    whisky_name_predicted: null,
  };

  fileSelectedHandler = (e) => {
    const fd = new FormData();
    fd.append("image", e.target.files[0], e.target.files[0].name);
    this.setState({
      whisky_index_predicted: null,
      whisky_name_predicted: null,
      selectedFile: e.target.files[0],
      fileURL: URL.createObjectURL(e.target.files[0]),
    });
    axios.post("http://127.0.0.1:5000/searchImage", fd).then((res) => {
      this.setState({
        whisky_index_predicted: res["data"]["index"],
        whisky_name_predicted: res["data"]["name"],
      });
    });
  };

  fileUploadHandler = () => {
    if (this.state.selectedFile != null) {
      const fd = new FormData();
      fd.append("image", this.state.selectedFile, this.state.selectedFile.name);
      axios.post("http://127.0.0.1:5000/searchImage", fd).then((res) => {
        this.setState({
          whisky_index_predicted: res["data"]["index"],
          whisky_name_predicted: res["data"]["name"],
        });
      });
    }
  };

  render() {
    return (
      <div className="home">
        <h1>Welcome</h1>
        <input type="file" onChange={this.fileSelectedHandler} />
        {/* <button onClick={this.fileUploadHandler}>Upload</button> */}
        <Bottle url={this.state.fileURL}></Bottle>
        <Comfirm_predict
          name={this.state.whisky_name_predicted}
          index={this.state.whisky_index_predicted}
        />
        <FilterSliderList></FilterSliderList>
      </div>
    );
  }
}

function Comfirm_predict(props) {
  if (props.name) {
    return (
      <div>
        <p>Is this what you are finding</p>
        <a href={"/whisky/" + props.index}>
          <p>{props.name}</p>
        </a>
      </div>
    );
  } else {
    return null;
  }
}

export default Home;
