import { dbConnect } from "./connectionDB.js";

export const getDaftarAjar = async (data) => {
    const conn = await dbConnect();
    return new Promise((resolve, reject) => {
        const sql = 'SELECT distinct Periode.ID_P, Periode.tanggalMulai, Periode.tanggalAkhir FROM Periode inner join Transaksi_Periode on Periode.ID_P = Transaksi_Periode.ID_P inner join Siswa on Siswa.ID_U = Transaksi_Periode.ID_U WHERE Siswa.kelas = ? AND Periode.tanggalAkhir >= ? LIMIT ?,? ';
        conn.query(sql, data, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
        conn.release();
    });
}

export const countDaftarAjar = async (data) => {
    const conn = await dbConnect();
    return new Promise((resolve, reject) => {
        const sql = 'SELECT distinct count(Periode.ID_P) as total FROM Periode inner join Transaksi_Periode on Periode.ID_P = Transaksi_Periode.ID_P inner join Siswa on Siswa.ID_U = Transaksi_Periode.ID_U WHERE Siswa.kelas = ? AND Periode.tanggalAkhir >= ? ';
        conn.query(sql, data, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
        conn.release();
    });
}

export const getKelasAjar = async (data) => {
    const conn = await dbConnect();
    return new Promise((resolve, reject) => {
        const sql = 'SELECT kelas FROM Guru WHERE ID_U = ?';
        conn.query(sql, data, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
        conn.release();
    });
}

export const getSiswaAjar = async (data) => {
    const conn = await dbConnect();
    return new Promise((resolve, reject) => {
        const sql = 'SELECT Siswa.nama FROM Periode inner join Transaksi_Periode on Periode.ID_P = Transaksi_Periode.ID_P inner join Siswa on Siswa.ID_U = Transaksi_Periode.ID_U WHERE Periode.ID_P = ? AND Siswa.kelas = ? LIMIT ?,?';
        conn.query(sql, data, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
        conn.release();
    });
}

export const countSiswaAjar = async (data) => {
    const conn = await dbConnect();
    return new Promise((resolve, reject) => {
        const sql = 'SELECT count(Siswa.ID_U) as total FROM Periode inner join Transaksi_Periode on Periode.ID_P = Transaksi_Periode.ID_P inner join Siswa on Siswa.ID_U = Transaksi_Periode.ID_U WHERE Periode.ID_P = ? AND Siswa.kelas = ?';
        conn.query(sql, data, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
        conn.release();
    });
}