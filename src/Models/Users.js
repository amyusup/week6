module.exports = {
  getUsers: (db, callback) => {
    db.query(`SELECT * FROM vUsers`, callback);
  },

  addUsers: (db, setData, callback) => {
    db.query(`INSERT INTO usersauth SET ?`, setData, callback);
  },

  updateUsers: (db, setData, id, callback) => {
    db.query(`UPDATE usersauth SET ? WHERE id=${id}`, setData, callback);
  },

  deleteUsers: (db, id, callback) => {
    db.query(`DELETE FROM usersauth WHERE id=${id}`, callback);
  },
};
