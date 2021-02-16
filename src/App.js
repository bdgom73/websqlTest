import 'antd/dist/antd.css';
import "./App.css"
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DBpage from './component/dbpage';
import Header from './component/header';
import Help from './component/help';
import Home from './component/home';
import "./DB";
import { createTable, update } from './DB';
import NotFound from './component/notfound';
const App = () => {

  const [info,setInfo] = useState({padding:"10px",display: "block"});
  return (
    <>
    <Router>
    <p className="bg-info" style={info}>
      WEB DB가 정상적으로 작동하지 않으면 <a href="/help">more</a>에서 도움받으세요!
      <button type="button" className="close" aria-label="Close" onClick={()=>{setInfo({...info,display:"none"})}}><span aria-hidden="true">&times;</span></button>
    </p>
    <div className="container">  
        <Header/>
        <Switch>
          <Route path="/" exact><Home/></Route>
          <Route path="/table"><DBpage/></Route>
          <Route path="/help"><Help/></Route>
          <Route component={NotFound}></Route>
        </Switch>
        
    </div>
    </Router>
    </>
  );
};

export default App;
