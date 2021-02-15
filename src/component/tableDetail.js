import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom"
import { DeleteById, DeleteTable, findAll } from "../DB";

export default function TableDetail(props) {
    
    const params = useParams();
    const history = useHistory();
    const [tableColumn,setTableColumn]=useState([])
    const [key,setKey] = useState([]);
    const [checked,setChecked]=useState(true);
    useEffect(()=>{
        findAll(params.tableName,(result)=>{
            setTableColumn(result);
            if(result.length !== 0){
                for(var keys in result[0]){   
                    key.push(keys);
                    setKey(key);
                }
            }   
        },(e)=>{
            alert(`${params.tableName} 테이블이 존재하지않습니다.`);
            history.push("/");
        })
    },[])

    const AllCheck=()=>{
        const c = document.querySelectorAll("#checked");
        setChecked(!checked);
        if(checked)
        for(let i = 0 ; i < c.length ; i++){
           c[i].checked = true
        }
        else
        for(let i = 0 ; i < c.length ; i++){
            c[i].checked = false
        }
    }

    const DeleteColumn = ()=>{
        const c = document.querySelectorAll("#checked");
        let che = 0
        for(let i = 0 ; i < c.length ; i++){
            if(c[i].checked){
                che = che+1
            }
         }
        if(che !== 0){
            if(window.confirm("정말로 삭제하시겠습니까? \n (삭제한 데이터는 복원할 수 없습니다.)")){     
                let deleteId = []
                for(let i = 0 ; i < c.length ; i++){
                   if(c[i].checked){
                        deleteId.push(c[i].value);
                   }
                }
                DeleteById(params.tableName,deleteId,()=>{
                    window.location.reload();
                });
            } 
        }else{
            alert("선택된 데이터가 없습니다.")
        }
        
    }

    const onCilckTableDelete = ()=>{
        if(window.confirm("정말로 이 테이블을 삭제하시겠습니까?")){
            DeleteTable(params.tableName,()=>{
                history.push("/table")
            })
        }
    }
    return(
        <> 
        <div className="panel panel-default">
        <div className="panel-heading"> 
            <button type="button" class="btn btn-danger" style={{float:"right" ,fontSize:"10px"}} onClick={onCilckTableDelete}>TableDelete</button>
            <h4><span className="glyphicon glyphicon-leaf"/><b>{`${params.tableName}` }</b></h4>
        </div>
        <table className="table table-hover ">  
            <thead>
                <tr>
                    {tableColumn.length !== 0 ? 
                    <th style={{cursor:"pointer"}} onClick={AllCheck}>✅</th> : <></>}
                    {
                    key.map(k=>{
                        return (
                            <>
                            <th>{k}</th>
                            </>
                        )
                    })
                    }
                    <th style={{width:"100px"}}></th>
                </tr>
            </thead>
                  <tbody>
                  {
                      tableColumn.length === 0 ? 
                      <td className="text-center" style={{padding:"10px"}}><b>데이터가 존재하지않습니다.</b></td> :
                      tableColumn.map(t=>{    
                          return(
                              <>        
                                  <tr key={t.id} className="table-hover" >
                                    <td><input type="checkbox" value={t.id} id="checked"/></td>
                                        {
                                            key.map((k,i)=>{
                                                return(
                                                    <td key={k+i}>{t[k]}</td>
                                                )                
                                            })
                                        }   
                                    <td><button type="button" value={t.id} class="btn btn-default" style={{margin:"5px"}} onClick={()=>{history.push(`/table/${params.tableName}/${t.id}/update`)}}>Update</button> </td>
                                  </tr>
                              </>
                          );
                      })
                  }               
                  </tbody>
        </table>
      
        </div>
        <div class="btn-group" role="group" style={{float:"right"}}>
            <button type="button" class="btn btn-success" onClick={()=>{history.push(`/table/${params.tableName}/insert`)}}>Insert</button>
            <button type="button" class="btn btn-danger" onClick={DeleteColumn}>Delete</button>
        </div>
    </>
    )
}