import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { createSQL, DefaultTableColumnName, findAll, findById, insert, update } from "../DB";
import DBpage from "./dbpage";
import moment from 'moment';
import { Button, DatePicker, version } from "antd";
export default function UpdatePage(props) {

    const params = useParams();
    const history = useHistory();
    const [tableColumn,setTableColumn] = useState([]);
    const [key,setKey]= useState([]);
    const [data,setData] = useState({});
    const [dt,setDt] = useState([]);
    const [n,setN] = useState([]);
    const [isDate,setIsDate] = useState([]);
    const [cd,setCd] = useState({});
    useEffect(()=>{
        DefaultTableColumnName(params.tableName,(result)=>{
            console.log(result)
            if(result){  
                const b =result.key.split(",");   
                for(let i =0; i < b.length ; i++){
                    let bb = b[i].split(" ");   
                    dt.push(b[i].split(" ")[1]);
                    setDt(dt);
                    key.push(b[i].split(" ")[0]);
                    setKey(key);    
                    if(b[i].split(" ")[2]){
                        n.push(b[i].split(" ")[2]+" " + b[i].split(" ")[3]);
                        setN(n);
                    }else{
                        n.push("");
                        setN(n);
                    }
                    isDate.push(b[i].split(" ")[(bb.length-1)] === 'true')
                    setIsDate(isDate)
                }
                console.log(key)
            }else{
                alert(`${params.tableName} 테이블이 존재하지않습니다.`);
                history.push("/");
            }
        })
        findById(params.tableName,params.id,(result)=>{
            if(result){
                setData(result);  
                setCd(result);  
            }else{
                alert(`${params.tableName} 테이블이 존재하지않습니다.`);
                history.push("/");
            }
        }) 
    },[])

    const onSubmitUpdate = (e)=>{
        try{
            e.preventDefault();
            let sql = `UPDATE ${params.tableName} SET`;
            
            for(let i =0; i < key.length ; i++){
                sql = sql + ` ${key[i]}="${e.target[i].value}",`;
            }
            sql = sql.substr(0, (sql.length-1));
            let cond = `WHERE id = ${params.id}`
            sql = sql + ` ${cond}`;  
            createSQL(sql,[],()=>{
                history.push(`/table/${params.tableName}`)
            })
        }catch(e){console.log(e)}
    }

    const dateFormat = 'YYYY-MM-DD';
    return(
        <>
         <form onSubmit={onSubmitUpdate}>
            <div className="row" >  
            {
                key.map((k,i)=>{
                    return(
                        <>
                        {
                            isDate[i] ? (
                                <>
                                <div className="col-md-8" key={k}>
                                    <div className="form-group">
                                    <label htmlFor={k}>{k}</label>
                                        <DatePicker style={{width:"100%"}} defaultValue={moment(data[k] ,dateFormat)} format={dateFormat}/>    
                                           
                                    </div>
                                </div>
                                <div className="col-md-3" style={{display:"flex",justifyContent:"flex-end",flexDirection:"column",height:"74px"}}> 
                                    <div className="form-group">
                                        <h6><b>Data Type</b></h6>
                                        <p className="form-control" style={{marginBottom:"0px"}}>{dt[i]}</p>
                                    </div> 
                                </div>
                                </>
                            ) : (
                                <>
                                 <div className="col-md-8" key={k}>
                                    <div className="form-group">
                                        <label htmlFor={k}>{k}</label>
                                        <input type="text" className="form-control" id={k} placeholder={`${k} 데이터값을 입력해주세요`} value={cd[k]}
                                        required={n[i] === "Not Null" ? true : false} onInvalid={(e)=>{ 
                                            if (e.target.value = "") {
                                                e.target.setCustomValidity("Null값");
                                            }
                                        }}
                                        onChange={(e)=>{ 
                                            let cv = e.target.value;
                                            cd[k] = cv;                    
                                            setCd({...cd})
                                        }}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-3"> 
                                    <div className="form-group">
                                        <h6><b>Data Type</b></h6>
                                        <p className="form-control">{dt[i]}</p>
                                    </div> 
                                </div>
                                </>

                            )
                        }        
                        </>
                    )
                })    
            }                
            </div>
            <button type="submit" className="btn btn-default">Update</button>
        </form>
        </>
    );
}