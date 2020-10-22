import Loader from 'react-loader-spinner';
import React from 'react';

 export default class LoaderSpinner extends React.Component {
  
    render() {
     return(
      <Loader
         type="ThreeDots"
         color="#00BFFF"
      />
     );
    }
 }