import { NavLink } from "react-router-dom";

export default function Header(){

    const ActiveStyle = {
        backgroundColor : "#D8D8D8"
    }
    return(
        <>
        <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <NavLink className="navbar-brand" to="/" >CRUD TEST</NavLink>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li><NavLink to="/table/create" activeStyle={ActiveStyle}>Create</NavLink></li>
              <li><NavLink to="/table" exact activeStyle={ActiveStyle}>Tables</NavLink></li>       
              <li className="dropdown">
                <NavLink to="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Developing...<span className="caret"></span></NavLink>
                <ul className="dropdown-menu" role="menu">
                  <li><NavLink to="#">Developing...</NavLink></li>
                  <li><NavLink to="#">Developing...</NavLink></li>
                  <li><NavLink to="#">Developing...</NavLink></li>
                  <li className="divider"></li>
                  <li className="dropdown-header">Developing...</li>
                  <li><NavLink to="#">Developing...</NavLink></li>
                  <li><NavLink to="#">Developing...</NavLink></li>
                </ul>
              </li>
              <li><NavLink to="/help" activeStyle={ActiveStyle}><span className="glyphicon glyphicon-question-sign"></span>{` HELP`}</NavLink></li>
            </ul>
          </div>
        </div>
      </nav>
        </>      
    );
}