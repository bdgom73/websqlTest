import { useEffect, useState } from "react";
import { Link, Route, Switch } from "react-router-dom";
import { createTable, findAllTable, findTablesName, findTop10Table } from "../DB";
import DBpage from "./dbpage";

export default function Home(props) {
    const [open,setOpen] = useState("");
    useEffect(()=>{
      if(window.openDatabase) setOpen("현재 브라우저는 Web SQL Database를 지원합니다");
      else setOpen("현재 브라우저는 Web SQL Database를 지원하지 않습니다 ");
    },[window.openDatabase])
    const [tables,setTables]=useState([]);
    const [btnAct,setBtnAct]=useState(true);
    useEffect(()=>{
        findTop10Table((table,_)=>{
            setTables(table);
        })
    },[tables])
    
    useEffect(()=>{
        findTablesName("testBoard",(t)=>{
            if(t){
                setBtnAct(true)
            }else{
                setBtnAct(false)
            }
            
        })
        
    },[tables])

    function createBasicBoardTable(e) {
        e.preventDefault();
        if(window.confirm("게시판 관련 테이블을 생성하시겠습니까?")){
            createTable("testBoard",["title TEXT","description TEXT","creator TEXT","created TEXT","updated TEXT"],[false]);
        }
    }
    return(
        <>
         <div className="jumbotron">
            <h1>CRUD TEST</h1>
            <p>
                <h4>이 페이지는 CREATE, READ, UPDATE, DELETE 를 연습하는 홈페이지입니다.</h4>
                <h4>{open}</h4>
                <span>
                    {
                        tables.length === 0 ? (
                            <><h4>생성된 테이블이 없습니다. <small className="text-lowercase"><Link to="/table/create">테이블 생성하기</Link></small></h4></>
                        ) : (
                            <>
                            <div className="panel panel-default">
                            <div className="panel-heading"><h4><span className="glyphicon glyphicon-leaf"/><b>생성된테이블 <small>(최근 생성된 10개의 테이블만 보여집니다.)</small></b></h4></div>
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
                                            <tr key={t.id+(t.id+1)} className="table-hover">
                                                <td>{t.id}</td> 
                                                <td>{t.tableName}</td>  
                                                <td>{t.created}</td>                
                                            </tr>
                                        );
                                    })
                                }
                                </tbody>
                            </table>
                            </div>
                            </>
                        )
                    }
                </span>
            </p>
            <p>
                <button type="button" className="btn btn-lg btn-primary" href="/db/table/create" onClick={createBasicBoardTable} disabled={btnAct}> 
                    게시판 관련 테이블 생성하기 
                </button>
            </p>    
         </div>
         
        </>
    );
}