import mysql from 'mysql';

const pool = mysql.createPool({
    user: 'root',
    password: '',
    database: 'TUBES_PBW_MIBD',
    host: 'localhost'
});

export const dbConnect = ()=>{
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err) {
                reject(err);
            } else {
                resolve(conn);
            }
        });
    });
};

