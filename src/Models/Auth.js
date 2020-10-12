module.exports = {
    Register: (db, setData, callback) =>{
        db.query(`INSERT INTO usersauth SET ?`,setData, callback)
    },

    getEmail: (db, data, callback) =>{
        db.query(`SELECT * FROM usersauth WHERE email=${db.escape(data)}`, callback)
    },
    
    lastLogin: (db, data,callback) =>{
        db.query(`UPDATE usersauth SET lastLogin=now() WHERE id=${data}`,callback)
    },
    
    
}