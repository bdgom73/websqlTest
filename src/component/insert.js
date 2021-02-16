import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { DefaultTableColumnName, findAll, insert } from "../DB";
import { Button, DatePicker, version } from "antd";
import "../App.css"
export default function InsertPage(props) {

    const params = useParams();
    const history = useHistory();
    const [key,setKey] = useState([]);
    const [dt,setDt] = useState([]);
    const [n,setN] = useState([]);
    const [isDate,setIsDate] = useState([]);
    useEffect(()=>{
        DefaultTableColumnName(params.tableName,(result)=>{
            if(result){  
                const b =result.key.split(",");   
                console.log(b); 
                setKey(b)
                for(let i =0; i < b.length ; i++){
                    let bb = b[i].split(" ");   
                    dt.push(b[i].split(" ")[1]);
                    setDt(dt);
                    key.push(b[i].split(" ")[0]);
                    setKey(key);    
                    if(b[i].split(" ")[2]){
                        n.push(b[i].split(" ")[2]+" " + b[i].split(" ")[3]);
                        setN(n);
                        console.log(n);
                    }else{
                        n.push("");
                        setN(n);
                    }
                    isDate.push(b[i].split(" ")[(bb.length-1)] === 'true')
                    setIsDate(isDate)
                }
              
            }else{
                alert(`${params.tableName} 테이블이 존재하지않습니다.`);
            history.push("/");
            }
        },(e)=>{
            console.log(e)
            alert(`${params.tableName} 테이블이 존재하지않습니다.`);
            history.push("/");
        })
    },[])

    const onSubmitInsert = (e)=>{  
        try{
            e.preventDefault();
            let ks =[]; let vs =[];
            for(let i =0; i < key.length ; i++){
                ks.push(key[i]);   
                vs.push(e.target[i].value);
                if(n[i] === "Not Null"){
                    if(e.target[i].value === "") {
                       
                        e.target[i].placeholder = "값을 입력하지 않았습니다."; 
                        // e.target[i].classList.add("placeholerErr");
                        e.target[i].id = "placeholerErr"
                        return; 
                    }
                }
            }
            insert(params.tableName,ks,vs,(rid)=>{
                history.push("/table/"+params.tableName)
            })
        }catch(e){}
      
    }

    return(
        <>
         <form onSubmit={onSubmitInsert}>
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
                                        <DatePicker style={{width:"100%"}}/>
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
                                        <input type="text" className="form-control" id={k} placeholder={`${k} 데이터값을 입력해주세요`}
                                        required={n[i] === "Not Null" ? true : false} onInvalid={(e)=>{
                                            if (e.target.value = "") {
                                                e.target.setCustomValidity("Null값");
                                            }
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
                 
            <button type="submit" className="btn btn-default">Insert</button>
        </form>
        
        </>
    );
}