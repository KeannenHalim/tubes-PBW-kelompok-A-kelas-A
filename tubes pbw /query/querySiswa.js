import { dbConnect } from "./connectionDB.js";

export const changeStatus = async (data) => {
    const conn = await dbConnect();
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE Siswa SET statusPTMT = ? WHERE ID_U = ? ';
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

export const getStatus = async (data) => {
    const conn = await dbConnect();
    return new Promise((resolve, reject) => {
        const sql = 'SELECT statusPTMT FROM Siswa WHERE ID_U = ?';
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

export const countDaftarSekolah = async (data) => {
    const conn = await dbConnect();
    return new Promise((resolve, reject) => {
        const sql = `SELECT count(Periode.ID_P) as total
        FROM Transaksi_Periode inner join Periode on Periode.ID_P = Transaksi_Periode.ID_P 
        WHERE Transaksi_Periode.ID_U = ? AND Periode.tanggalAkhir >= ? `;
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

export const getDaftarSekolah = async (data) => {
    const conn = await dbConnect();
    return new Promise((resolve, reject) => {
        const sql = `SELECT Periode.tanggalMulai, Periode.tanggalAkhir 
        FROM Transaksi_Periode inner join Periode on Periode.ID_P = Transaksi_Periode.ID_P 
        WHERE Transaksi_Periode.ID_U = ? AND Periode.tanggalAkhir >= ? LIMIT ?,?`;
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

export const updateSertif = async (data) => {
    const conn = await dbConnect();
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE Siswa SET vaksinKe = ?, buktiVaksin = ?, tanggalVaksin = ? WHERE ID_U = ? ';
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

export const validateOneDate = (dateStr) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;

    if (dateStr.match(regex) === null) {
        return false;
    }

    const date = new Date(dateStr);

    const timestamp = date.getTime();

    if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) {
        return false;
    }

    return date.toISOString().startsWith(dateStr);
}

export const countPeriodaDaftar = async (data) => {
    const conn = await dbConnect();
    return new Promise((resolve, reject) => {
        const sql = `  SELECT
                            count(Periode.ID_P) as total
                        FROM
                            (
                                SELECT
                                    himpSiswa.ID_U, himpSiswa.kapasitas, Transaksi_Periode.ID_P
                                FROM
                                (    
                                    SELECT  Siswa.ID_U, Ruangan.kapasitas
                                    FROM    Siswa inner join Ruangan on 
                                            Siswa.kode_ruang = Ruangan.kode_ruangan
                                    WHERE   Siswa.kelas = ? 
                                )as himpSiswa inner join Transaksi_Periode on
                                    Transaksi_Periode.ID_U = himpSiswa.ID_U
                            )as himpTrans right join Periode on Periode.ID_P = himpTrans.ID_P
                        WHERE Periode.tanggalMulaiDaftar <= ? AND Periode.tanggalAkhirDaftar >= ?
                        Group By Periode.ID_P
                    `;
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

export const getPeriodaDaftar = async (data) => {
    const conn = await dbConnect();
    return new Promise((resolve, reject) => {
        const sql = `  SELECT
                            Periode.ID_P, count(himpTrans.ID_U)as jumlah, himpTrans.ID_U,Periode.tanggalMulai, Periode.tanggalAkhir,
                            (himpTrans.kapasitas*Periode.persentaseKapasitas/100)as total, Periode.tanggalMulaiDaftar, Periode.tanggalAkhirDaftar
                        FROM
                            (
                                SELECT
                                    himpSiswa.ID_U, himpSiswa.kapasitas, Transaksi_Periode.ID_P
                                FROM
                                (    
                                    SELECT  Siswa.ID_U, Ruangan.kapasitas
                                    FROM    Siswa inner join Ruangan on 
                                            Siswa.kode_ruang = Ruangan.kode_ruangan
                                    WHERE   Siswa.kelas = ? 
                                )as himpSiswa inner join Transaksi_Periode on
                                    Transaksi_Periode.ID_U = himpSiswa.ID_U
                            )as himpTrans right join Periode on Periode.ID_P = himpTrans.ID_P
                        WHERE Periode.tanggalMulaiDaftar <= ? AND Periode.tanggalAkhirDaftar >= ?
                        Group By Periode.ID_P
                        LIMIT ?,?
                    `;
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

export const getKelas = async (data) => {
    const conn = await dbConnect();
    return new Promise((resolve, reject) => {
        const sql = `SELECT Kelas FROM Siswa WHERE ID_U = ?`;
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

export const checkTransaksi = async (data) => {
    const conn = await dbConnect();
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM Transaksi_Periode WHERE ID_U = ? AND ID_P = ?`;
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

export const checkStatus = async (data) => {
    const conn = await dbConnect();
    return new Promise((resolve, reject) => {
        const sql = `SELECT statusPTMT FROM Siswa WHERE ID_U = ?`;
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

export const checkJumlah = async (data) => {
    const conn = await dbConnect();
    return new Promise((resolve, reject) => {
        const sql = `SELECT count(Siswa.ID_U) as jumlah FROM Siswa inner join Transaksi_Periode on Transaksi_Periode.ID_U = Siswa.ID_U
                    inner join Periode on Periode.ID_P = Transaksi_Periode.ID_P WHERE Siswa.Kelas = ? AND Periode.ID_P = ?`;
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


export const getMax = async (data) => {
    const conn = await dbConnect();
    return new Promise((resolve, reject) => {
        const sql = `SELECT distinct (himpKode.kapasitas * Periode.persentaseKapasitas/100)as tot
                    FROM        
                        (
                            SELECT Ruangan.kapasitas 
                            FROM Siswa inner join Ruangan on 
                                Siswa.kode_ruang = Ruangan.kode_ruangan
                            WHERE kelas = ?
                        )as himpKode cross join Periode 
                    WHERE Periode.ID_P = ?
                    `;
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
export const tambahTransaksi = async (data) => {
    const conn = await dbConnect();
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO Transaksi_Periode (ID_U,ID_P) VALUES (?,?)`;
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

export const checkVaksin = async (data) => {
    const conn = await dbConnect();
    return new Promise((resolve, reject) => {
        const sql = `SELECT vaksinKe FROM Siswa WHERE ID_U = ?`;
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