import { useState } from "react";

export default function Help(props) {
    
    const [copyVaule, setCopyVaule] = useState();
    const [copyMsg,setCopyMsg] = useState(false);
    function copyHandler() {
        const copy = document.getElementById("adminEmail");
        var tempElem = document.createElement('textarea');
        tempElem.value = copy.innerText;  
        setCopyVaule(copy.innerText);
        document.body.appendChild(tempElem);
        tempElem.select();
        document.execCommand("copy");
        document.body.removeChild(tempElem);
        setCopyMsg(!copyMsg);
        setTimeout(()=>{
            setCopyMsg(false);
        },5000)
    }
    return(
        <>
        <div class="row">
            <div class="col-md-3">
            <ul class="nav nav-pills nav-stacked">
                <li role="presentation"><a href="#Clear" onClick={(e)=>{e.preventDefault()}}>데이터베이스 개발자 도구로 초기화</a></li>
                <li role="presentation"><a href="" onClick={(e)=>{e.preventDefault()}}>개선중</a></li>
                <li role="presentation"><a href="" onClick={(e)=>{e.preventDefault()}}>개선중</a></li>
            </ul>
            </div>
            <div class="col-md-9">
                <div className="panel panel-default">
                <div className="panel-heading text-center"><h4><b>Web SQL Clear</b></h4></div>
                    <div className="jumbotron" style={{backgroundColor:"#ffffff"}}>
                    <ol>
                        <li>사용자가 사용하는 브라우저를 통해 현재페이지에 접속합니다.</li><br/>
                        <li><button className="btn btn-default" disabled>F12</button>를 클릭해 개발자도구를 엽니다.</li><br/>
                        <li>
                            <span>[Application] - [Storage] - Web Sql 선택 후 [Clear site data] 클릭을 합니다.</span>
                            <img src="/f12.jpg" alt={"F12"} style={{width:"100%"}} className="img-thumbnail"/>
                        </li><br/> 
                        <li>
                            새로고침 후 비워진 DataBase를 다시 적용합니다.
                            <p className="text-danger" style={{fontSize:"12px"}}>만약 사이트가 정상적으로 작동되지 않을경우 해당페이지를 재접속 해주세요.</p>
                        </li>
                    </ol>
                    </div>
                    <div className="jumbotron" style={{marginBottom:"0px"}}> 
                        <h2>도움이 되었나요?</h2>
                        <address>도움이 되지않았다면 도움이 필요한 부분을
                            <strong id="adminEmail" onClick={copyHandler} style={{ position:"relative",cursor:"pointer"}}> bdgom73@naver.com
                           
                                {
                                    copyMsg ? (
                                    <>
                                    <div className="emailCopy">
                                        {copyVaule}가 클립보드로 복사되었습니다.
                                    </div>
                                    </>): (<></>)
                                }
                             </strong>  
                        으로 보내주세요</address>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}