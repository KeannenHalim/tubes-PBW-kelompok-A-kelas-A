import { dbConnect } from "./connectionDB.js";

export const getPerioda = async () => {
    const conn = await dbConnect();
    return new Promise((resolve, reject) => {
        const sql = 'SELECT distinct Guru.nama, Periode.tanggalMulai, Periode.tanggalAkhir, Siswa.kelas, count(Siswa.ID_U) as jumlah FROM Periode inner join Transaksi_Periode on Periode.ID_P = Transaksi_Periode.ID_P inner join Siswa on Siswa.ID_U = Transaksi_Periode.ID_U inner join Guru on Guru.kelas = Siswa.kelas GROUP BY Periode.ID_P, Siswa.kelas ORDER BY Periode.tanggalMulai, Siswa.kelas ASC';
        conn.query(sql, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
        conn.release();
    });
};

export const getGuru = async (data) => {
    const conn = await dbConnect();
    return new Promise((resolve, reject) => {
        const sql = 'SELECT nama FROM Guru WHERE kelas = ?';
        conn.query(sql, data, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
        conn.release();
    });
};

export const getDataSiswa = async () => {
    const conn = await dbConnect();
    return new Promise((resolve, reject) => {
        const sql = `SELECT distinct Periode.ID_P, count(Siswa.ID_U) as jumlah 
        FROM Transaksi_Periode inner join Siswa on 
        Siswa. ID_U = Transaksi_Periode.ID_U right join Periode 
        on Periode.ID_P = Transaksi_Periode.ID_P GROUP BY Periode.ID_P 
        ORDER BY Periode.tanggalMulai ASC`;
        conn.query(sql, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
        conn.release();
    });
};

export const getDataGuru = async () => {
    const conn = await dbConnect();
    return new Promise((resolve, reject) => {
        const sql = `  
                    SELECT Periode.ID_P, count(himp.ID_U) as jumlah 
                    FROM
                        (
                            SELECT distinct Transaksi_Periode.ID_P, Guru.ID_U
                            FROM Transaksi_Periode inner join Siswa
                            on Siswa.ID_U = Transaksi_Periode.ID_U
                            inner join Guru on Guru.Kelas = Siswa.Kelas
                            GROUP BY Transaksi_Periode.ID_P
                        )as himp right join Periode on himp.ID_P = Periode.ID_P
                        GROUP BY Periode.ID_P
                        `;
        conn.query(sql, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
        conn.release();
    });
};