import express from "express";
import path from "path";
import session from "express-session"
import memoryStore from "memorystore"
import { auth, encryptPass, updatePass } from "./query/queryLogin.js";
import { addPerioda, deletePerioda, getGuru, getSiswa, getPeriode, resetPassword, validateDate, deleteGuru, deleteSiswa, getRuangan, getKepsek, deleteKepsek, deleteRuangan, addDataKepsek, getSatpam, deleteSatpam, addDataSatpam, insertGuru, insertSiswa, insertOrtu, insertEmail, getIdSiswaAdmin, insertRuangan, countPeriode, countGuru, countSiswa, countRuangan, countKepsek, countSatpam, cetakJadwal, countJadwal, getPeriodeFilter, countPeriodeFilter, deleteEmailO, deleteNamaO } from "./query/queryAdmin.js";
import { cekSiswa, getIdSiswa } from "./query/querySatpam.js";
import { parse } from "fast-csv";
import fs from "fs";
import { uploadGuru } from "./multer/addGuru.js";
import { uploadSiswa } from "./multer/addSiswa.js";
import { uploadRuangan } from "./multer/addRuangan.js";
import { countDaftarAjar, countSiswaAjar, getDaftarAjar, getKelasAjar, getSiswaAjar } from "./query/queryGuru.js";
import { getDataSiswa, getPerioda, getDataGuru } from "./query/queryKepsek.js";
import { changeStatus, checkJumlah, checkStatus, checkTransaksi, checkVaksin, countDaftarSekolah, countPeriodaDaftar, getDaftarSekolah, getKelas, getMax, getPeriodaDaftar, getStatus, tambahTransaksi, updateSertif, validateOneDate } from "./query/querySiswa.js";
import { uploadVaksin } from "./multer/addVaksin.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 8080;
const SessionStore = memoryStore(session);
app.use(express.static(path.resolve("public")));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    cookie: {
        httpOnly: false,
        // sameSite: 'strict',
        maxAge: 1 * 60 * 60 * 1000
    },
    store: new SessionStore({
        checkPeriod: 1 * 60 * 60 * 1000,
    }),
    name: 'session',
    secret: 'Kemarin malam aku makan baso',

    resave: false,
    saveUninitialized: false
}));

const authLogin = (req, res, next) => {
    if (!req.session.ID_U) {
        res.redirect('/');
    } else {
        next();
    }
};

const checkRoleAdmin = async (req, res, next) => {
    if (req.session.ROLE === 'admin') {
        next();
    } else {
        res.send(403);
    }
};

const checkRoleSiswa = async (req, res, next) => {
    if (req.session.ROLE === 'siswa') {
        next();
    } else {
        res.send(403);
    }
};

const checkRoleSiswaVaksin = async (req, res, next) => {
    const vaksin = await checkVaksin(req.session.ID_U);
    if (vaksin.length > 0 && vaksin[0].vaksinKe >= 2) {
        next();
    } else {
        res.render('belumVaksin', {
            page: 'belumVaksin'
        });
    }
};

const checkRoleSiswaStatus = async (req, res, next) => {
    const stat = await checkStatus(req.session.ID_U);
    if (stat[0].statusPTMT === 1) {
        next();
    } else {
        res.render('belumUbahStatusPTMT', {
            page: 'belumUbahStatusPTMT'
        });
    }
};

const checkRoleGuru = async (req, res, next) => {
    if (req.session.ROLE === 'guru') {
        next();
    } else {
        res.send(403);
    }
};

const checkRoleSatpam = async (req, res, next) => {
    if (req.session.ROLE === 'satpam') {
        next();
    } else {
        res.send(403);
    }
};

const checkRoleKepsek = async (req, res, next) => {
    if (req.session.ROLE === 'kepsek') {
        next();
    } else {
        res.send(403);
    }
};

//login
app.get('/', (req, res) => {
    res.render('login', {
        cek: true
    });
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const resAuth = await auth(username, password);
    if (resAuth === undefined || resAuth.length === 0) {
        res.render('login', {
            cek: false
        });
    } else {
        let { ID_U, nama, role } = resAuth[0];
        req.session.ID_U = ID_U;
        req.session.NAME = nama;
        req.session.ROLE = role;
        if (role === "admin") {
            res.redirect('/admin');
        } else if (role === "siswa") {
            res.redirect('/siswa');
        } else if (role === "satpam") {
            res.redirect('/satpam');
        } else if (role === "kepsek") {
            res.redirect('/kepsek');
        } else if (role === "guru") {
            res.redirect('/guru');
        }
    };
});

app.get('/change_account_password', (req, res) => {
    res.render('changePassword');
});

app.post('/changePass', async (req, res) => {
    const input = req.body;
    if (input.username.length > 0) {
        const { username, passwordOld, passwordNew } = input;
        let resPass = await updatePass(username, passwordOld, passwordNew);
        if (resPass === false) {
            res.json('false')
        } else {
            res.json('true');
        }
    } else {
        res.json('false');
    }
});

//logout
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

//admin
app.get('/admin', authLogin, checkRoleAdmin, (req, res) => {
    res.render('adminAddPerioda', {
        cek: true
    });
});

app.get('/add_perioda', authLogin, checkRoleAdmin, (req, res) => {
    res.redirect('/admin');
});

app.post('/add_perioda', authLogin, checkRoleAdmin, async (req, res) => {
    let input = req.body;
    let { kapasitas, tgl_mulai_dftr, tgl_akhir_dftr,
        tgl_mulai_perioda, tgl_akhir_perioda } = input;

    if (validateDate(tgl_mulai_dftr, tgl_akhir_dftr, tgl_mulai_perioda, tgl_akhir_perioda) && kapasitas !== undefined) {
        let add = await addPerioda([tgl_mulai_perioda, tgl_akhir_perioda, kapasitas, tgl_mulai_dftr, tgl_akhir_dftr]);
        res.redirect('/admin');
    } else {
        res.render('adminAddPerioda', {
            cek: false
        });
    }
});



app.get('/daftar_perioda', authLogin, checkRoleAdmin, async (req, res) => {
    let filter = req.query.filter;
    let hapus = req.query.hapus;

    let halaman = parseInt(req.query.start);
    if (!halaman) {
        halaman = 0;
    }
    const listPerioda = await getPeriode([halaman, 5]);
    let total = await countPeriode();
    total = total[0].total / 5;

    if (hapus === undefined && filter === undefined) {
        res.render('adminDaftarPerioda', {
            perioda: listPerioda,
            page: total,
            name: '',
            errMsg: ''
        })
    } else if (hapus && filter === undefined) {
        try {
            await deletePerioda(hapus);
            res.redirect('/daftar_perioda');
        } catch (err) {
            res.render('adminDaftarPerioda', {
                perioda: listPerioda,
                page: total,
                name: '',
                errMsg: 'tidak dapat dihapus'
            })
        }
    } else if (filter && hapus === undefined) {
        const nama = filter;
        filter = filter.split("/").reverse().join('');

        let listPeriodaFilter = await getPeriodeFilter([filter, halaman, 5]);
        let totalFilter = await countPeriodeFilter(filter);
        totalFilter = totalFilter[0].total / 5;
        res.render('adminDaftarPerioda', {
            perioda: listPeriodaFilter,
            page: totalFilter,
            name: nama,
            errMsg: ''
        })
    }
});

app.get('/cetak_jadwal', authLogin, checkRoleAdmin, async (req, res) => {
    const idP = req.query.cetak;
    let halaman = parseInt(req.query.start);
    if (!halaman) {
        halaman = 0;
    }
    const colOfDaftarSiswa = await cetakJadwal([idP, halaman, 8]);

    let total = await countJadwal(idP);
    total = total[0].total / 5;
    res.render('cetakJadwal', {
        page: total,
        siswas: colOfDaftarSiswa,
        id: idP
    });
});

app.get('/kelola_data', authLogin, checkRoleAdmin, (req, res) => {
    res.render('kelolaData');
});

//kelola data guru
app.get('/data_guru', authLogin, checkRoleAdmin, (req, res) => {
    res.render('kelolaDataGuru');
});

app.post('/upload-guru', authLogin, checkRoleAdmin, uploadGuru.single('file_guru'), (req, res) => {
    const result = [];
    const file = req.file.filename;
    fs.createReadStream(`./upload/upload excel guru/${file}`)
        .pipe(parse({ delimiter: ';', headers: true }))
        .on('data', (data) => result.push(data))
        .on('end', async () => {
            for (let i of result) {
                await insertGuru([i.NIP, i.nama, i.username, i.kelas, i.kode_ruang]);
            }
        });
    res.redirect('/data_guru');
});

app.get('/guru/template', authLogin, checkRoleAdmin, async (req, res) => {
    res.sendFile('template guru.xlsx', { root: path.join(__dirname, './template/') });
});

app.get('/daftar-guru', authLogin, checkRoleAdmin, async (req, res) => {
    let halaman = parseInt(req.query.start);
    if (!halaman) {
        halaman = 0;
    }
    const colOfGuru = await getGuru([halaman, 5]);
    let total = await countGuru();
    total = total[0].total / 5;
    let hapusGuru = req.query.hapus;
    if (hapusGuru === undefined) {
        res.render('daftarGuru', {
            gurus: colOfGuru,
            page: total,
            errMsg: ''
        });
    } else {
        try {
            await deleteGuru(hapusGuru);
            res.redirect('/daftar-guru');
        } catch (err) {
            res.render('daftarGuru', {
                gurus: colOfGuru,
                page: total,
                errMsg: 'tidak dapat dihapus'
            });
        }
    }

});

app.post('/resetGuru', authLogin, checkRoleAdmin, async (req, res) => {
    const userGuru = req.body.username;
    await resetPassword(['Guru', userGuru]);
    res.redirect('/data_guru');
});

//kelola data siswa
app.get('/data_siswa', authLogin, checkRoleAdmin, async (req, res) => {

    res.render('kelolaDataSiswa', {
        ket: ''
    });
});

app.post('/upload-siswa', authLogin, checkRoleAdmin, uploadSiswa.single('file_siswa'), (req, res) => {
    const result = [];
    const file = req.file.filename;
    fs.createReadStream(`./upload/upload excel murid/${file}`)
        .pipe(parse({ delimiter: ';', headers: true }))
        .on('data', (data) => result.push(data))
        .on('end', async () => {
            let cek = true;
            for (let i of result) {
                let tglLahirReverse = i.tanggalLahir.split("-").join("");
                const encPass = encryptPass(tglLahirReverse);
                const tglLahirDate = new Date(i.tanggalLahir);
                try {
                    await insertSiswa([i.NIS, i.nama, i.username, encPass, i.email, i.kelas, i.kode_ruang, tglLahirDate]);
                    let idSiswa = await getIdSiswaAdmin(i.username);
                    idSiswa = idSiswa[0].ID_U;
                    let ortu = i.orangTua.split(",");
                    for (let j of ortu) {
                        await insertOrtu([idSiswa, j.trim()]);
                    }

                    let emailOrtu = i.emailOrangTua.split(",");
                    for (let j of emailOrtu) {
                        await insertEmail([idSiswa, j.trim()]);
                    }

                    const folderName = `./public/vaksin/${idSiswa}`;
                    try {
                        if (!fs.existsSync(folderName)) {
                            fs.mkdirSync(folderName);
                        }
                    } catch (err) {
                        console.error(err);
                    }
                }
                catch (err) {
                    cek = false;
                }

            }
            if (cek === false) {
                res.render('kelolaDataSiswa', {
                    ket: 'isi ruangan terlebih dahulu'
                })
            } else {
                res.redirect('/data_siswa');
            }
        });
    
});

app.get('/siswa/template', authLogin, checkRoleAdmin, async (req, res) => {
    res.sendFile('template siswa.xlsx', { root: path.join(__dirname, './template/') });
});

app.get('/daftar-siswa', authLogin, checkRoleAdmin, async (req, res) => {
    let halaman = parseInt(req.query.start);
    if (!halaman) {
        halaman = 0;
    }
    const colOfSiswa = await getSiswa([halaman, 5]);
    let total = await countSiswa();
    total = total[0].total / 5;
    let hapusSiswa = req.query.hapus;
    if (hapusSiswa === undefined) {
        res.render('daftarSiswa', {
            siswas: colOfSiswa,
            page: total,
            errMsg: ''
        });
    } else {
        try {
            await deleteEmailO(hapusSiswa);
            await deleteNamaO(hapusSiswa);
            await deleteSiswa(hapusSiswa);

            res.redirect('/daftar-siswa');
        } catch (err) {
            console.log(err);
            res.render('daftarSiswa', {
                siswas: colOfSiswa,
                page: total,
                errMsg: 'tidak dapat dihapus'
            });
        }
    }

});

app.post('/resetSiswa', authLogin, checkRoleAdmin, async (req, res) => {
    const userSiswa = req.body.username;
    await resetPassword(['Siswa', userSiswa]);
    res.redirect('/data_siswa');
});

app.get('/generate', authLogin, checkRoleAdmin, (req, res) => {
    res.render('generate', {
        page: 'generate'
    })
});

//kelola data ruangan
app.get('/data_ruangan', authLogin, checkRoleAdmin, (req, res) => {
    res.render('kelolaDataRuangan');
});

app.post('/upload-ruangan', authLogin, checkRoleAdmin, uploadRuangan.single('file_ruangan'), (req, res) => {
    const result = [];
    const file = req.file.filename;
    fs.createReadStream(`./upload/upload excel ruangan/${file}`)
        .pipe(parse({ delimiter: ';', headers: true }))
        .on('data', (data) => result.push(data))
        .on('end', async () => {
            for (let i of result) {
                await insertRuangan([i.kode_ruangan, i.kapasitas]);
            }
        });
    res.redirect('/data_ruangan');
});

app.get('/ruangan/template', authLogin, checkRoleAdmin, async (req, res) => {
    res.sendFile('template ruangan.xlsx', { root: path.join(__dirname, './template/') });
});

app.get('/daftar-ruangan', authLogin, checkRoleAdmin, async (req, res) => {
    let halaman = parseInt(req.query.start);
    if (!halaman) {
        halaman = 0;
    }
    const colOfRuangan = await getRuangan([halaman, 5]);
    let total = await countRuangan();
    total = total[0].total / 5;
    let hapusRuangan = req.query.hapus;
    if (hapusRuangan === undefined) {
        res.render('daftarRuangan', {
            ruangans: colOfRuangan,
            page: total,
            errMsg: ''
        });
    } else {
        try {
            await deleteRuangan(hapusRuangan);
            res.redirect('/daftar-ruangan');
        } catch (err) {
            console.log(err);
            res.render('daftarRuangan', {
                ruangans: colOfRuangan,
                page: total,
                errMsg: 'tidak dapat dihapus'
            });
        }
    }
});

//kelola data kepsek
app.get('/data_kepsek', authLogin, checkRoleAdmin, (req, res) => {
    res.render('kelolaDataKepalaSekolah', {
        cek: true
    });
});

app.get('/daftar-kepsek', authLogin, checkRoleAdmin, async (req, res) => {
    let halaman = parseInt(req.query.start);
    if (!halaman) {
        halaman = 0;
    }
    const colOfKepsek = await getKepsek([halaman, 5]);
    let total = await countKepsek();
    total = total[0].total / 5;
    let hapusKepsek = req.query.hapus;
    if (hapusKepsek === undefined) {
        res.render('daftarKepsek', {
            kepsek: colOfKepsek,
            page: total
        });
    } else {
        deleteKepsek(hapusKepsek);
        res.redirect('/daftar-kepsek');
    }
});

app.post('/resetKepsek', authLogin, checkRoleAdmin, async (req, res) => {
    const userKepsek = req.body.username;
    await resetPassword(['Kepala_Sekolah', userKepsek]);
    res.redirect('/data_kepsek');
});

app.post('/upload-kepsek', async (req, res) => {
    const { nama, username, password } = req.body;
    const addRes = await addDataKepsek(username, nama, password, 'Kepala_Sekolah');
    if (addRes === false) {
        res.render('KelolaDataKepalaSekolah', {
            cek: false
        });
    } else {
        res.redirect('/data_kepsek');
    }
});

//kelola data satpam
app.get('/data_satpam', authLogin, checkRoleAdmin, (req, res) => {
    res.render('kelolaDataSatpam', {
        cek: true
    });
});

app.get('/daftar-satpam', authLogin, checkRoleAdmin, async (req, res) => {
    let halaman = parseInt(req.query.start);
    if (!halaman) {
        halaman = 0;
    }
    const colOfSatpam = await getSatpam([halaman, 5]);
    let total = await countSatpam();
    total = total[0].total / 5;
    let hapusSatpam = req.query.hapus;
    if (hapusSatpam === undefined) {
        res.render('daftarSatpam', {
            satpams: colOfSatpam,
            page: total
        });
    } else {
        deleteSatpam(hapusSatpam);
        res.redirect('/daftar-satpam');
    }
});

app.post('/upload-satpam', authLogin, checkRoleAdmin, async (req, res) => {
    const { nama, username, password } = req.body;
    const addRes = await addDataSatpam(username, nama, password, 'Satpam');
    if (addRes === false) {
        res.render('KelolaDataSatpam', {
            cek: false
        });
    } else {
        res.redirect('/data_satpam');
    }
});

app.post('/resetSatpam', authLogin, checkRoleAdmin, async (req, res) => {
    const userSatpam = req.body.username;
    await resetPassword(['Satpam', userSatpam]);
    res.redirect('/data_satpam');
});

//siswa
app.get('/siswa', authLogin, checkRoleSiswa, async (req, res) => {
    let today = new Date();
    let date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    let halaman = parseInt(req.query.start);
    if (!halaman) {
        halaman = 0;
    }
    const colOfJadwal = await getDaftarSekolah([req.session.ID_U, date, halaman, 5]);
    let total = await countDaftarSekolah([req.session.ID_U, date]);
    total = total[0].total / 5;
    res.render('siswa', {
        page: 'Siswa',
        jadwal: colOfJadwal,
        page: total
    });
});

app.get('/siswa/vaksin', authLogin, checkRoleSiswa, async (req, res) => {
    const id = req.session.ID_U;
    const statPtmt = await getStatus(id);
    if (statPtmt[0].statusPTMT === 1) {
        res.render('siswaVaksin', {
            page: 'vaksin',
            status: 'YA'
        })
    } else {
        res.render('siswaVaksin', {
            page: 'vaksin',
            status: 'TIDAK'
        })
    }
});

app.post('/siswa/vaksin', authLogin, checkRoleSiswa, uploadVaksin.single('buktiVaksin'), async (req, res) => {
    const file = req.file.filename;
    const { vaksinKe, tanggalVaksin } = req.body;
    const bukti = `./public/vaksin/${req.session.ID_U}/${file}`;
    const isValid = validateOneDate(tanggalVaksin);
    if (isValid) {
        await updateSertif([parseInt(vaksinKe), bukti, tanggalVaksin, req.session.ID_U]);
    }
    res.redirect('/siswa/vaksin');
});

app.get('/siswa/perioda', authLogin, checkRoleSiswa, checkRoleSiswaStatus, checkRoleSiswaVaksin, async (req, res) => {
    const pilih = req.query.pilih;
    const tot = req.query.max;
    const kelas = await getKelas(req.session.ID_U)
    if (pilih !== undefined) {
        const cekTrans = await checkTransaksi([req.session.ID_U, pilih]);
        const cekJum = await checkJumlah([kelas[0].Kelas, pilih]);
        const maksimum = await getMax([kelas[0].Kelas, pilih]);
        if (cekTrans.length <= 0 && ((cekJum[0].jumlah) + 1) <= maksimum[0].tot) {
            const masukkan = await tambahTransaksi([req.session.ID_U, pilih])
        }
    }
    let halaman = parseInt(req.query.start);
    if (!halaman) {
        halaman = 0;
    }
    const today = new Date();
    const date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();


    const perioda = await getPeriodaDaftar([kelas[0].Kelas, date, date, halaman, 5]);
    let total = await countPeriodaDaftar([kelas[0].Kelas, date, date]);
    total = total[0].total / 5;

    res.render('siswaDaftarPerioda', {
        page: 'perioda',
        daftar: perioda,
        page: total
    })
});

app.post('/siswa/statusPTMT', authLogin, checkRoleSiswa, async (req, res) => {
    const id = req.session.ID_U;
    const inChange = req.body.a;
    if (inChange === 'ya') {
        await changeStatus([1, id]);
        res.json('success');
    } else if (inChange === 'tidak') {
        await changeStatus([0, id]);
        res.json('success');
    } else {
        res.json('failed');
    }

})

//satpam
app.get('/satpam', authLogin, checkRoleSatpam, (req, res) => {
    res.render('satpam', {
        page: 'satpam'
    });
});

app.post('/satpam/cek', authLogin, checkRoleSatpam, async (req, res) => {
    let cekNis = req.body.nis;
    let resNis = '';
    if (cekNis !== '') {
        let id = await getIdSiswa(cekNis);
        if (id.length > 0) {
            id = id[0].ID_U;
            resNis = await cekSiswa(id);
        }
    }
    let check = false;
    if (resNis.length > 0) {
        check = true;
    }
    res.json(String(check));
});

//kepsek
app.get('/kepsek', authLogin, checkRoleKepsek, async (req, res) => {
    const daftarDetil = await getPerioda();
    res.render('kepsek', {
        page: 'kepsek',
        daftar: daftarDetil
    });
});

//kepsek grafik
app.get('/kepsek/grafik', authLogin, checkRoleKepsek, (req, res) => {
    res.render('kepsekGrafik', {
        page: 'grafik'
    });
});

app.post('/getDataGrafik', authLogin, checkRoleKepsek, async (req, res) => {
    const filt = req.body.a;
    if (filt === 'murid') {
        const dataMurid = await getDataSiswa();
        res.json(dataMurid);
    } else {
        const dataGuru = await getDataGuru();
        res.json(dataGuru);
    }
});

//guru
app.get('/guru', authLogin, checkRoleGuru, async (req, res) => {
    let halaman = parseInt(req.query.start);
    if (!halaman) {
        halaman = 0;
    }
    const today = new Date();
    const date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    const kelas = await getKelasAjar(req.session.ID_U);
    const colOfDaftar = await getDaftarAjar([kelas[0].kelas, date, halaman, 5]);
    let total = await countDaftarAjar([kelas[0].kelas, date]);
    total = total[0].total / 5;

    res.render('guru', {
        page: 'guru',
        daftar: colOfDaftar,
        page: total
    });
});

//guru daftar siswa
app.get('/guru/daftar_siswa/:id_periode', authLogin, checkRoleGuru, async (req, res) => {
    let halaman = parseInt(req.query.start);
    if (!halaman) {
        halaman = 0;
    }
    const idPeriode = req.params.id_periode;
    let kelasSiswa = await getKelasAjar([req.session.ID_U]);
    kelasSiswa = kelasSiswa[0].kelas;
    const colOfSiswaDiajar = await getSiswaAjar([idPeriode, kelasSiswa, halaman, 10]);
    let total = await countSiswaAjar([idPeriode, kelasSiswa]);
    total = total[0].total / 10;


    res.render('guruDaftarSiswa', {
        page: 'Daftar Siswa',
        siswa: colOfSiswaDiajar,
        page: total,
        id: idPeriode
    });
});

app.listen(port, () => {
    console.log('listening');
});