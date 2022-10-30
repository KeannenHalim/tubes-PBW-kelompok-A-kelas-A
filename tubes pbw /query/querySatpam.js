import { dbConnect } from "./connectionDB.js";

export const getIdSiswa = async (nis)=>{
    const conn = await dbConnect();
    return new Promise((resolve, reject) => {
        const sql = 'SELECT ID_U FROM Siswa WHERE NIS = ? AND statusPTMT = 1 ';
        conn.query(sql, nis, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
        conn.release();
    });
};

export const cekSiswa = async (id)=>{
    const conn = await dbConnect();
    let today = new Date();
    let date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    return new Promise((resolve, reject) => {
        const sql = `SELECT Periode.tanggalMulai, Periode.tanggalAkhir 
        FROM Transaksi_Periode inner join Periode on Transaksi_Periode.ID_P = Periode.ID_P 
        WHERE Transaksi_Periode.ID_U = ? AND Periode.tanggalMulai <= ? AND Periode.tanggalAkhir >= ?`;
        conn.query(sql, [id,date,date], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
        conn.release();
    });
};