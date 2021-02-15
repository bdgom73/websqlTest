Date.prototype.format = (date)=>{
    let year = date.getFullYear().toString();
    let day = date.getDate().toString();
    let month = date.getMonth();
    let hour = date.getHours().toString();
    let min = date.getMinutes().toString();

    let m;
    if(day.length < 2) day = "0"+ day;
    if(hour.length < 2) hour = "0"+hour;
    if(min.length < 2) min = "0"+min;
    
    switch(month){
        case 0:
            m = "01";
            break;
        case 1:
            m = "02";
            break;
        case 2:
            m = "03";
            break;
        case 3:
            m = "04";
            break;
        case 4:
            m = "05";
            break;
        case 5:
            m = "06";
            break;
        case 6:
            m = "07";
            break;
        case 7:
            m = "08";
            break;
        case 8:
            m = "09";
            break;
        case 9:
            m = "10";
            break;
        case 10:
            m = "11";
            break;
        case 11:
            m = "12";    
            break;
    }
  
    return (
        `${year}.${m}.${day} ${hour}:${min}`
    );
    
}

