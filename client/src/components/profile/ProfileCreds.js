import React, { Component } from "react";
import Moment from "react-moment";

class ProfileCreds extends Component {
  render() {
    const { experience, education } = this.props;

    const expItems = experience.map(exp => (
      <li key={exp._id} className="list-group-item">
        <h4>{exp.comapny}</h4>
        <p>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{" "}
          {exp.to === null ? (
            " Now"
          ) : (
            <Moment format="YYYY/MM/DD"> {exp.to}</Moment>
          )}
        </p>
        <p>Position: {exp.title}</p>
        {exp.location === "" ? null : <span>Location: {exp.location}</span>}
        {exp.description === "" ? null : (
          <span>Description: {exp.description}</span>
        )}
      </li>
    ));

    const eduItems = education.map(edu => (
      <li key={edu._id} className="list-group-item">
        <h4>{edu.school}</h4>
        <p>
          <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{" "}
          {edu.to === null ? (
            " Now"
          ) : (
            <Moment format="YYYY/MM/DD"> {edu.to}</Moment>
          )}
        </p>
        <p>Degree: {edu.title}</p>
        <p>Frield Of Study: {edu.fieldofstudy}</p>
        {edu.description === "" ? null : (
          <span>Description: {edu.description}</span>
        )}
      </li>
    ));

    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info"> Experience</h3>
          {expItems.length > 0 ? (
            <ul className="list-group">{expItems}</ul>
          ) : (
            <p className="text-center">No experience listed</p>
          )}
        </div>
        <div className="col-md-6">
          <h3 className="text-center text-info"> Education</h3>
          {eduItems.length > 0 ? (
            <ul className="list-group">{eduItems}</ul>
          ) : (
            <p className="text-center">No education listed</p>
          )}
        </div>
      </div>
    );
  }
}

export default ProfileCreds;
