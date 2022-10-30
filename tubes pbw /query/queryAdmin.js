import { dbConnect } from "./connectionDB.js";

import { encryptPass } from "./queryLogin.js";
export const addPerioda = async (data) => {
    const conn = await dbConnect();
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO Periode 
        (tanggalMulai, tanggalAkhir, persentaseKapasitas, tanggalMulaiDaftar, tanggalAkhirDaftar) 
         VALUES (?, ?, ?, ?, ?) `;
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

export const deletePerioda = async (id_p) => {
    const conn = await dbConnect();
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM Periode WHERE ID_P = ?';
        conn.query(sql, id_p, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
        conn.release();
    });
};

export const deleteGuru = async (id_u) => {
    const conn = await dbConnect();
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM Guru WHERE ID_U = ?';
        conn.query(sql, id_u, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
        conn.release();
    });
};

export const deleteSiswa = async (id_u) => {
    const conn = await dbConnect();
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM Siswa WHERE ID_U = ?';
        conn.query(sql, id_u, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
        conn.release();
    });
};

export const deleteRuangan = async (id_r) => {
    const conn = await dbConnect();
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM Ruangan WHERE kode_ruangan = ?';
        conn.query(sql, id_r, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
        conn.release();
    });
};

export const deleteEmailO = async (id) => {
    const conn = await dbConnect();
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM daftar_emailOrtu WHERE ID_U = ?';
        conn.query(sql, id, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
        conn.release();
    });
};

export const deleteNamaO = async (id) => {
    const conn = await dbConnect();
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM daftar_namaOrtu WHERE ID_U = ?';
        conn.query(sql, id, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
        conn.release();
    });
};

export const deleteKepsek = async (id_u) => {
    const conn = await dbConnect();
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM Kepala_Sekolah WHERE ID_U = ?';
        conn.query(sql, id_u, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
        conn.release();
    });
};

export const deleteSatpam = async (id_u) => {
    const conn = await dbConnect();
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM Satpam WHERE ID_U = ?';
        conn.query(sql, id_u, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
        conn.release();
    });
};

const checkUsername = async (data) => {
    const conn = await dbConnect();
    return new Promise((resolve, reject) => {
        const sql = 'SELECT nama FROM ?? WHERE username = ?';
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
export const addDataKepsek = async (username, nama, password, tabel) => {
    const conn = await dbConnect();
    const uname = await checkUsername([tabel, username]);
    if (uname[0] === undefined) {
        const enPass = encryptPass(password);
        const data = [nama, username, enPass];
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO Kepala_Sekolah (nama,username,password,role)  VALUES (?, ?, ?, "kepsek") ';
            conn.query(sql, data, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
            conn.release();
        });
    } else {
        return false;
    }
};
//cek apakah username nya udah ada ato belum, yang d bawah blm d cek
export const addDataSatpam = async (username, nama, password, tabel) => {
    const conn = await dbConnect();
    const uname = await checkUsername([tabel, username]);
    if (uname[0] === undefined) {
        const enPass = encryptPass(password);
        const data = [nama, username, enPass];
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO Satpam (nama,username,password,role)  VALUES (?, ?, ?, "kepsek") ';
            conn.query(sql, data, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
            conn.release();
        });
    } else {
        return false;
    }
};

const validateOneDate = (dateStr) => {
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

export const validateDate = (startDaftar, endDaftar, start, end) => {
    let startCopy = start;
    let endCopy = end;
    let startDafCopy = startDaftar;
    let endDafCopy = endDaftar;
    let cek1 = validateOneDate(start);
    let cek2 = validateOneDate(end);
    let cek3 = validateOneDate(startDaftar);
    let cek4 = validateOneDate(endDaftar);
    let cek5 = false;
    let cek6 = false;
    if (Date.parse(startCopy) >= Date.parse(endDafCopy) && Date.parse(startCopy) <= Date.parse(endCopy)) {
        cek5 = true;
    }

    if (Date.parse(startDafCopy) <= Date.parse(endDafCopy)) {
        cek6 = true;
    }

    return cek1 && cek2 && cek3 && cek4 && cek5 && cek6
};

export const resetPassword = async (data) => {
    const conn = await dbConnect();
    return new Promise((resolve, reject) => {

        const sql = `UPDATE ?? SET password = "XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=" 
                    WHERE username = ?`;
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

export const countPeriode = async () => {
    const conn = await dbConnect();
    return new Promise((resolve, reject) => {
        const sql = `SELECT count(ID_P) as total
                        FROM Periode `;
        conn.query(sql, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
        conn.release();
    });
}

export const getPeriode = async (data) => {
    const conn = await dbConnect();
    return new Promise((resolve, reject) => {
        const sql = `SELECT ID_P, tanggalMulai, tanggalAkhir, tanggalMulaiDaftar, tanggalAkhirDaftar 
                        FROM Periode ORDER BY tanggalMulai asc LIMIT ?, ? `;
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

export const countPeriodeFilter = async (data) => {
    const conn = await dbConnect();
    return new Promise((resolve, reject) => {
        const sql = `SELECT count(ID_P) as total
                        FROM Periode WHERE tanggalMulai = ?`;
        conn.query(sql, data,(err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
        conn.release();
    });
}

export const getPeriodeFilter = async (data) => {
    const conn = await dbConnect();
    return new Promise((resolve, reject) => {
        const sql = `SELECT ID_P, tanggalMulai, tanggalAkhir, tanggalMulaiDaftar, tanggalAkhirDaftar 
                        FROM Periode WHERE tanggalMulai = ? ORDER BY tanggalMulai asc LIMIT ?, ? `;
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

export const countGuru = async () => {
    const conn = await dbConnect();
    return new Promise((resolve, reject) => {
        const sql = 'SELECT count(ID_U) as total FROM Guru ';
        conn.query(sql, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
        conn.release();
    });
}

export const getGuru = async (data) => {
    const conn = await dbConnect();
    return new Promise((resolve, reject) => {
        const sql = 'SELECT ID_U, NIP, nama, username, kelas, kode_ruang FROM Guru ORDER BY kelas asc LIMIT ?,? ';
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

export const countSiswa = async () => {
    const conn = await dbConnect();
    return new Promise((resolve, reject) => {
        const sql = 'SELECT count(ID_U) as total FROM Siswa';
        conn.query(sql, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
        conn.release();
    });
}

export const getSiswa = async (data) => {
    const conn = await dbConnect();
    return new Promise((resolve, reject) => {
        const sql = 'SELECT ID_U, NIS, nama, username, kelas, kode_ruang FROM Siswa ORDER BY kelas, nama asc LIMIT ?,?';
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

export const countRuangan = async () => {
    const conn = await dbConnect();
    return new Promise((resolve, reject) => {
        const sql = 'SELECT count(kode_ruangan) as total FROM Ruangan';
        conn.query(sql, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
        conn.release();
    });
}

export const getRuangan = async (data) => {
    const conn = await dbConnect();
    return new Promise((resolve, reject) => {
        const sql = 'SELECT kode_ruangan, kapasitas FROM Ruangan ORDER BY kode_ruangan LIMIT ?, ?';
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

export const countKepsek = async () => {
    const conn = await dbConnect();
    return new Promise((resolve, reject) => {
        const sql = 'SELECT count(ID_U) as total FROM Kepala_Sekolah';
        conn.query(sql, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
        conn.release();
    });
}

export const getKepsek = async (data) => {
    const conn = await dbConnect();
    return new Promise((resolve, reject) => {
        const sql = 'SELECT ID_U, nama, username FROM Kepala_Sekolah LIMIT ?,?';
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

export const countSatpam = async () => {
    const conn = await dbConnect();
    return new Promise((resolve, reject) => {
        const sql = 'SELECT count(ID_U) as total FROM Satpam ';
        conn.query(sql, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
        conn.release();
    });
}

export const getSatpam = async (data) => {
    const conn = await dbConnect();
    return new Promise((resolve, reject) => {
        const sql = 'SELECT ID_U, nama, username FROM Satpam LIMIT ?,?';
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

export const insertGuru = async (data) => {
    const conn = await dbConnect();
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO Guru (NIP, nama, username, password,kelas,kode_ruang)
                VALUES (?, ?, ?, "XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=", ?,?)`;
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

export const insertSiswa = async (data) => {
    const conn = await dbConnect();
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO Siswa (NIS, nama, username, password,email,kelas,kode_ruang,tanggalLahir)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
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

export const insertEmail = async (data) => {
    const conn = await dbConnect();
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO daftar_emailOrtu (ID_U,email) VALUES (?, ?)';
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

export const insertOrtu = async (data) => {
    const conn = await dbConnect();
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO daftar_namaOrtu (ID_U,nama) VALUES (?, ?)';
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

export const getIdSiswaAdmin = async (data) => {
    const conn = await dbConnect();
    return new Promise((resolve, reject) => {
        const sql = 'SELECT ID_U FROM Siswa WHERE username = ?';
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

export const insertRuangan = async (data) => {
    const conn = await dbConnect();
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO Ruangan (kode_ruangan, kapasitas) VALUES (?, ?)';
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

export const cetakJadwal = async (data) => {
    const conn = await dbConnect();
    return new Promise((resolve, reject) => {
        const sql = `SELECT Siswa.nama, Siswa.Kelas
                        FROM Siswa inner join Transaksi_Periode on
                            Siswa.ID_U = Transaksi_Periode.ID_U inner join Periode
                            on Periode.ID_P = Transaksi_Periode.ID_P
                        WHERE Periode.ID_P = ?
                        LIMIT ?, ?`;
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

export const countJadwal = async (data) => {
    const conn = await dbConnect();
    return new Promise((resolve, reject) => {
        const sql = `SELECT count(Siswa.ID_U)as total
                        FROM Siswa inner join Transaksi_Periode on
                            Siswa.ID_U = Transaksi_Periode.ID_U inner join Periode
                            on Periode.ID_P = Transaksi_Periode.ID_P
                        WHERE Periode.ID_P = ?`
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