import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { createSQL, DefaultTableColumnName, findAll, findById, insert, update } from "../DB";
import DBpage from "./dbpage";

export default function UpdatePage(props) {

    const params = useParams();
    const history = useHistory();
    const [tableColumn,setTableColumn] = useState([]);
    const [key,setKey]= useState([]);
    const [data,setData] = useState({});
    const [cd,setCd] = useState({});
    useEffect(()=>{
        findAll(params.tableName,(result)=>{
            setTableColumn(result);
            if(result.length !== 0){
                for(var keys in result[0]){          
                    if(keys !== "id"){
                        key.push(keys);
                        setKey(key);
                    }
                   
                }
            }   
        },(e)=>{
            alert(`${params.tableName} 테이블이 존재하지않습니다.`);
            history.push("/");
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

  
    return(
        <>
         <form onSubmit={onSubmitUpdate}>
            <div className="row" >  
            {
                key.map((k,i)=>{
                    return (  
                        <div className="form-group">
                            <label htmlFor={k}>{k}</label>
                            <input type="text" className="form-control" id={k} value={cd[k]} onChange={(e)=>{ 
                                let cv = e.target.value;
                                cd[k] = cv;                    
                                setCd({...cd})
                            }}/>
                        </div>
                    )
                })
            }                
            </div>
            <button type="submit" className="btn btn-default">Update</button>
        </form>
        </>
    );
}