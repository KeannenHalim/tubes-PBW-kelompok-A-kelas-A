import { dbConnect } from "./connectionDB.js";
import crypto from "crypto";

export const encryptPass = (password) => {
    return crypto.createHash('sha256').update(password).digest('base64');
};

const checkUser = (username) => {
    if (username.includes("admin")) {
        return "Admin";
    } else if (username.includes("siswa")) {
        return "Siswa";
    } else if (username.includes("satpam")) {
        return "Satpam";
    } else if (username.includes("guru")) {
        return "Guru";
    } else if (username.includes("kepsek")) {
        return "Kepala_Sekolah";
    }
};

const checkCredential = (conn, check) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT ID_U, nama, role FROM ?? WHERE username = ? AND password = ?';
        conn.query(sql, check, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

export const updatePass = async (username, passwordOld, passwordNew) => {
    const tabel = checkUser(username);
    let conn = await dbConnect();
    if (tabel !== undefined) {
        const encPassNew = encryptPass(passwordNew);
        const encPassOld = encryptPass(passwordOld);
        let check = await checkCredential(conn, [tabel, username, encPassOld]);
        if (check.length > 0) {
            return new Promise((resolve, reject) => {
                const sql = 'UPDATE ?? SET password = ? WHERE username = ? AND password = ?';
                conn.query(sql, [tabel, encPassNew, username, encPassOld], (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
                conn.release();
            });
        } else {
            conn.release();
            return false;
        }
    } else {
        conn.release();
        return false;
    }
}
export const auth = async (username, password) => {
    const table = checkUser(username);
    if ((table !== undefined)) {
        const encryptedPass = encryptPass(password);
        const conn = await dbConnect();
        const result = await checkCredential(conn, [table, username, encryptedPass]);
        conn.release();
        return result;
    }
}
