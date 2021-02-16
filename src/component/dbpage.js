import { useEffect, useState } from "react";
import { Link, NavLink, Route, Switch, useHistory } from "react-router-dom";
import { createTable, findTableList, findTablesName } from "../DB";
import InsertPage from "./insert";
import TableDetail from "./tableDetail";
import UpdatePage from "./update";
import "antd/dist/antd.css";
import NotFound from "./notfound";
export default  function DBpage(props) {

    const ActiveStyle = {
        backgroundColor : "#002664",
        color:"#ffffff"
    }
    const [tableList, setTableList] = useState([]);

    const getTableList = ()=>{
        findTableList((result)=>{   
            setTableList(result);
        })
    }
    useEffect(getTableList,[tableList]);
  
    return(
        <>
        <div className="container">
        <div className="row">
        <div className="col-md-3">
                <ul className="nav nav-pills nav-stacked">
                    <li role="presentation" ><NavLink to="/table/create" activeStyle={ActiveStyle}>CreateTable</NavLink></li>
                    <li className="dropdown">
                        <a className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">TableList<span className="caret"></span></a>
                            <ul className="dropdown-menu" role="menu">
                                {
                                    tableList.length !==0 ?
                                    tableList.map(t=>{
                                        return (
                                        <>
                                            <li key={t.id}><a href={"/table/"+t.tableName} activeStyle={ActiveStyle}>{t.tableName}</a></li>
                                        </>
                                        )
                                    }) : <li className="text-center"><small><mark>생성된 테이블이 없습니다.</mark></small></li>
                                }
                            </ul>
                    </li>
                </ul>
            </div>
            <div className="col-md-8">   
                <Switch>
                    <Route path="/table" exact component={AllTables}></Route>
                    <Route path="/table/create" exact><CreateTablePage/></Route>
                    <Route path="/table/:tableName" exact><TableDetail/></Route>
                    <Route path="/table/:tableName/insert" exact><InsertPage/></Route>
                    <Route path="/table/:tableName/:id/update" exact><UpdatePage/></Route>
                    <Route component={NotFound}></Route>
                </Switch>
            </div>
        </div>
        </div>
        </>
    );
}
function AllTables(props) {
    let history = useHistory();
    const [tables,setTables]=useState([]);
    useEffect(()=>{
        findTableList((result)=>{
            setTables(result)
        })
    })

    return(
        <>
        <div className="panel panel-default">
        <div className="panel-heading"><h4><span className="glyphicon glyphicon-leaf"/><b>모든테이블</b></h4></div>
        <table className="table table-hover ">  
            <thead>
                <tr>
                    <th>#</th>
                    <th>Table Name</th>
                    <th>Table Created</th>
                </tr>
            </thead>
            <tbody >
            {
                tables.map(t=>{
                    return(
                        <>
                            <tr key={t.id+(t.id+t.id)} className="table-hover">
                                <td>{t.id}</td> 
                                <td onMouseUp={()=>{
                                     history.push(`/table/${t.tableName}`)
                                }} style={{cursor:"pointer"}}>{t.tableName}</td>  
                                <td>{t.created}</td>                
                            </tr>
                        </>
                    );
                })
            }
            </tbody>
        </table>
        </div>
        </>
    );
}
function CreateTablePage(props) {
    const pattern = "^[A-Za-z]*[A-Za-z0-9_]"
    const [cs,setCs] = useState(1);
    const [column,setColumn] = useState([]);
    const history = useHistory();
    const onSubmitHandler = (e)=>{
        e.preventDefault();
        let columns = []; let dataType = []; let nu = []; let wdata=[];
        let value = [];
        for(let i = 0 ; i < e.target.length ; i++){      
            if(e.target[i].id.indexOf("column") != -1){columns.push(e.target[i].value);}
            if(e.target[i].id.indexOf("dataType") != -1){  dataType.push(e.target[i].value);}
            if(e.target[i].id.indexOf("isnull")!= -1){nu.push(e.target[i].checked);}
            if(e.target[i].id.indexOf("date")!= -1){wdata.push(e.target[i].checked);}
        }
        for(let j = 0 ; j < columns.length ; j++){ 
            value.push(`${columns[j]} ${dataType[j]} ${nu[j] ? "Not Null" : ""}`)
        }
        const tn = e.target[0].value
        findTablesName(e.target[0].value,(table,_)=>{
            if(!table){          
                createTable(e.target[0].value,value,wdata,()=>{
                    alert(`${e.target[0].value}테이블이 생성되었습니다.`);
                    e.target[0].value = "";
                    setCs(1)
                    for(let i = 0 ; i < e.target.length ; i++){      
                        if(e.target[i].id.indexOf("column") != -1)(e.target[i].value = "")    
                    }
                    history.push(`/table/${tn}`);
                })
            }else{
                alert("존재하는 테이블입니다.");
            }
        });
    }

    const addColumn = ()=>{setCs(cs+1);}
    const revertColumn = ()=>{if(!(cs < 2)) setCs(cs-1);}
    const drawColumn = ()=>{
        let c = [];
        for(let i = 0; i < cs ; i++){
            c.push(
            <>
            <hr></hr>
            <div className="row" key={i} style={{marginTop:"30px"}}>
                <div className="col-md-6">
                    <label htmlFor={`column${i+1}`}>컬럼{i+1}</label>
                    <input type="text" className="form-control" id={`column${i+1}`} placeholder={`컬럼명${i+1}`} required pattern={pattern}/>
                </div>
                <div className="col-md-3">
                    <label htmlFor={`dataType${i+1}`}>컬럼{i+1} Data Type</label> 
                    <select className="form-control" name="dataType" id="dataType">
                        <option value="TEXT">TEXT</option>
                        <option value="INTEGER">INTEGER</option>
                        <option value="BIGINT">BIGINT</option>
                        <option value="DATE">DATE</option>
                        <option value="FLOAT">FLOAT</option>
                        <option value="TIME">TIME</option>
                        <option value="DATETIME">DATETIME</option>
                        <option value="XML">XML</option>
                        <option value="IMAGE">IMAGE</option>
                        <option value="BINARY">BINARY</option>
                        <option value="VARCHAR" disabled>VARCHAR</option>
                    </select>      
                </div>
                <div className="col-md-3" style={{display:"flex", alignItems:"flex-start",justifyContent:"flex-start", height:"61px",flexDirection:"column"}}>
                    <label htmlFor="isnull" >NOT NULL<input type="checkbox" value="Not null" id="isnull" style={{marginLeft:"10px"}}/></label>
                    <label htmlFor="date" >날짜<input type="checkbox" value="date" id="date" style={{marginLeft:"10px"}}/><p class="text-danger"><small>날짜시 체크</small></p></label>
                    
                </div>
            </div>
            </>
            )
        }
        setColumn(c);
    }
    useEffect(drawColumn,[cs]);

    

    return(
        <>
        <p class="text-danger"><small>기본키 (Primary Key)는 <i><strong>' id INTEGER Primary key '</strong></i> 로 지정되어있습니다.</small></p>
        <form onSubmit={onSubmitHandler}>
            <div className="form-group">
                <label htmlFor="tableName">테이블이름</label>
                <input type="text" className="form-control" id="tableName" placeholder="테이블 명을 입력해주세요." required pattern={pattern}/>
                <p class="text-danger"><small>첫 글자는 [a-z,A-Z]으로만 가능하고, 그 이후 [a-z , A-Z , 0~9, _] 만 사용가능합니다.</small></p>
            </div>
            <div className="form-group">
                <h5 style={{fontWeight:"bold"}}>테이블 컬럼명</h5>
                <p class="text-danger"><small>첫 글자는 [a-z,A-Z]으로만 가능하고, 그 이후 [a-z , A-Z , 0~9, _] 만 사용가능합니다.</small></p>
                <div className="form-group" >
                    {
                        column.map(c=>{
                            return c    
                        })
                    }
                </div>    
            </div>        
            <div className="form-group">
                <button type="button" className="btn btn-primary" onClick={addColumn}>추가 +</button>
                <button type="button" className="btn btn-warning" onClick={revertColumn} style={{marginLeft:"10px"}}>삭제 -</button>
            </div>
            <button type="submit" className="btn btn-default">제출</button>
        </form>

            
        </>
    );
}
