import "./date";

let db;
function openDB() {
    try{
        db = openDatabase('test', '1.0', 'data base crud test', 10 * 1024 * 1024);
        db.transaction((tx)=>{
            tx.executeSql(
                `CREATE TABLE TABLES (id INTEGER Primary key,tableName VARCHAR(150), created VARCHAR(150), key JSON)`
            );
        });
    }catch(e){}
    
}

openDB();

export function findTablesName(tableName,cb) {
    if(db){
        try{
            db.transaction(tx=>{
                tx.executeSql(
                    `SELECT * from TABLES where tableName = ?`,
                    [tableName],(tx,result)=>{
                        const table = result.rows[0];
                        if(cb) cb(table,result);
                    }
                )
            })  
        }catch(e){}
    }else{
      
    }   
}


export function findAllTable(cb) {
    if(db){
    try{
        db.transaction(tx=>{
            tx.executeSql(
                `SELECT * from TABLES `,
                [],(tx,result)=>{
                    let table = []
                    for(let i =0; i < result.rows.length ; i++){
                        table.push(result.rows.item(i))
                    }
                    if(cb) cb(table,result);
                }
            )
        })  
    }catch(e){}  
    }
    else{
        
    }
}
export function findTop10Table(cb) {
    if(db){
        try{
            db.transaction(tx=>{
                tx.executeSql(
                    `SELECT * from TABLES order by id desc Limit 10 `,
                    [],(tx,result)=>{
                        let table = []
                        for(let i =0; i < result.rows.length ; i++){
                            table.push(result.rows.item(i))
                        }
                        if(cb) cb(table,result);
                    }
                )
            })  
        }catch(e){}  
    }
}
export function findAll(tableName,cb,error) {
    if(db){
        try{
        db.transaction(tx=>{
            tx.executeSql(
                `SELECT * FROM ${tableName}`,
                [],(tx,result)=>{
                    let table = [];
                    for(let i = 0; i < result.rows.length ; i++){
                        table.push(result.rows.item(i));
                    }
                    if(cb) cb(table);
                },(tx,e)=>{
                    console.log(e)
                    if(error) error(e);
                }
            )
        })
        }
    catch(e){}
    }
}

export function findById(tableName,id,cb,error) {
    if(db){
        try{
        db.transaction(tx=>{
            tx.executeSql(
                `SELECT * FROM ${tableName} where id = ?`,
                [id],(tx,result)=>{   
                    if(cb) cb(result.rows[0]);
                },(tx,e)=>{
                    console.log(e)
                    if(error) error(e);
                }
            )
        })
        }
        catch(e){}
    }
}

export function createSQL(sql,arg,cb,err) {
    if(db){
    try{
        db.transaction((tx)=>{
            tx.executeSql(sql,arg,(tx,result)=>{
                if(cb) cb(tx,result);
            },(tx,e)=>{
                if(err) err(tx,e);
            })
              
        })
    }catch(e){}
    }
}

export function createTable(tableName,rows,date,cb,err){
    if(db){
    try{
        let tableColumnName = [];
        let sql = `CREATE TABLE ${tableName} (id INTEGER Primary key,`;
        for(let i = 0; i < rows.length ; i++){
            sql = sql+rows[i]+","; 
            tableColumnName.push(rows[i] + " " + date[i]);       
        }

        sql = sql.substr(0, (sql.length-1));
        sql = sql + ")";
        console.log(sql);
        db.transaction((tx)=>{
            tx.executeSql(sql ,[] ,(tx,result)=>{
                insert("TABLES",["tableName","created","key"],[tableName, new Date().format(new Date()),tableColumnName]);
                if(cb) cb();
            },(tx,error)=>{
                if(err) err(error);
                console.log(error)
            });
        })
    }catch(e){}
    }
}

export function insert(tableName,columnName,rows,cb,err){
    if(db){
    try{
        let sql = `INSERT into ${tableName} (`;
        for(let i = 0; i < (columnName.length) ; i++){
            sql = sql + `${columnName[i]},`
        }
        sql = sql.substr(0, (sql.length-1));
        sql = sql + ") VALUES(";
        let arg = []
        for(let i = 0; i < (rows.length) ; i++){
             sql = sql+"?,";
        }
        sql = sql.substr(0, (sql.length-1));
        sql = sql + ")";
        for(let i = 0; i < rows.length ; i++){
            arg.push(rows[i]);
        }
        console.log(sql);
        db.transaction((tx)=>{
            tx.executeSql( 
                sql ,arg ,(tx,result)=>{
                const id = result.insertId;
                if(cb) cb(result,id);
            },(tx,error)=>{
                if(err) err(error);
                console.log(error);
            });
        }) 
    }catch(e){}
}
   
}

export function update(tableName,updateData,condition,cb,error) {
    if(db){
    try{
        let sql = `UPDATE ${tableName} set `
        for(var key in updateData){
            sql = sql + `${key} = '${updateData[key]}',`
        }
        sql = sql.substr(0, (sql.length-1));
        if(condition){
            sql = sql +` ${condition}`
        }
        db.transaction(tx=>{
            tx.executeSql(sql,
                [],(tx,result)=>{
                    if(cb) cb(tx,result);
                },(tx,e)=>{
                    console.log(e);
                    if(error) error(tx,error)
                }
            )
        })
    }catch(e){}
    }
  
}

export function findTableList(cb) {
    if(db){
    try{
        db.transaction(tx=>{
            tx.executeSql(
                `SELECT * FROM TABLES`,[], (tx,result)=>{
                    let rowValue = [];
                    for(let i = 0 ; i < result.rows.length ; i++){
                        rowValue.push(result.rows.item(i));
                    }     
                    if(cb) cb(rowValue);
                }
            )
        })
    }catch(e){}
    }
}
export function DeleteTable(tableName,cb,error) {
    if(db){
    let sql = `DROP TABLE ${tableName}`
    try{
        db.transaction(tx=>{
            tx.executeSql(sql,
            [],(tx,result)=>{
                DeleteByTableName(tableName);
                if(cb) cb(result);
            },(tx,e)=>{
                if(error) error(e);
            })
        })
    }catch(e){}
    } 
}
export function DeleteByTableName(tableName,cb,error) {
    if(db){
    let sql = `DELETE FROM TABLES WHERE tableName = "${tableName}"`
    try{
        db.transaction(tx=>{
            tx.executeSql(sql,
            [],(tx,result)=>{
                if(cb) cb(result);
            },(tx,e)=>{
                if(error) error(e);
            })
        })
    }catch(e){}
    }
}
export function DeleteById(tableName,deleteId,cb,error) {
    if(db){
    let sql = `DELETE FROM ${tableName} WHERE id IN (`
    for(let i = 0; i<deleteId.length;i++){
        sql = sql + deleteId[i] +","
    } 
    sql = sql.substr(0, (sql.length-1));
    sql = sql + ")";
    try{
        db.transaction(tx=>{
            tx.executeSql(sql,
            [],(tx,result)=>{
                if(cb) cb(result);
            },(tx,e)=>{
                if(error) error(e);
            })
        })
    }catch(e){}
    }
}

export function DefaultTableColumnName(b,cb,error) {
    if(db){
    let sql = `SELECT key FROM TABLES WHERE tableName = ?`
    try{
        db.transaction(tx=>{
            tx.executeSql(sql,
            [b],(tx,result)=>{
                if(cb) cb(result.rows[0]);
            },(tx,e)=>{
                if(error) error(e);
            })
        })
    }catch(e){}
    }
}