import React, { Component, Fragment } from "react";

import styles from "./Index.less";

import welcomeImg from "../../assets/welcome.png";

export default class Index extends Component {
  state = {};

  componentDidMount() {}

  componentWillUnmount() {}
  render() {
    return (
      <Fragment>
        <img src={welcomeImg} alt="welcome" className={styles.welcome} />
      </Fragment>
    );
  }
}
