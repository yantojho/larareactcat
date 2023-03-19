import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';
import axios from 'axios';
import Countdown from 'react-countdown';

import Layout from './../../Shared/UjianLayout';
import Modal from './../../Shared/Modal';

export default (props) => {
    const { flash } = usePage().props;
    const [modal, setModal] = useState({
        open: false,
        isConfirm: false,
        text: '',
        link: ''
    });
    const [page, setPage] = useState(1);

    //membuatkan konstanta untuk masing2 props
    const ujian = props.ujian;
    const semuasoal = props.soal;
    const soal = props.soalaktif;
    const pilihan = props.pilihan;
    const nosoal = props.nosoal;
    const nilai = props.nilai;
    const datasoal = [];
    let soaltempt = [];
    semuasoal.map((so, index) => {
        soaltempt.push(so);
        if ((index + 1) % 10 == 0) {
            datasoal.push(soaltempt);
            soaltempt = [];
        }
    });
    const soalkiri = page * 2 - 2;
    const soalkanan = page * 2 - 1;
    let startnumber = (page - 1) * 20 + 1;
    let totalpage = Math.ceil(datasoal.length / 2);

    const durasi = flash.durasi != null ? flash.durasi : nilai.durasi;
    const [waktu, setWaktu] = useState(durasi); //state sisa waktu
    const [counter, setCounter] = useState(0);

    //buka modal
    function handleOpenModal(isConfirm, text, link) {
        setModal({
            open: true,
            isConfirm: isConfirm,
            text: text,
            link: link
        });
    }

    //tutup modal
    function handleCloseModal() {
        setModal((values) => ({
            ...values,
            open: false
        }));
    }

    //update durasi setiap 10 detik
    useEffect(() => {
        setCounter(counter + 1);
        if (counter % 10 == 1 && soal != null) axios.put(route('ujian.update', nilai.id), { durasi: waktu });
    }, [waktu]);

    //menampilkan dialog saat peserta menutup tab atau tutup jendela browser
    useEffect(() => {
        return () => {
            window.addEventListener('beforeunload', function (event) {
                event.preventDefault();
                event.returnValue = '';
            })
        }
    })

    let huruf = ["A", "B", "C", "D", "E"];

    return (
        <Layout>
            <Helmet>
                <title>Halaman Ujian</title>
            </Helmet>
            <div className="row">


                {/* ------------ KOLOM SOAL -------------------*/}
                <div className="col-md-12">
                    <div className="card">
                        {/* ------------ HEADER SOAL -------------------*/}
                        <div className="card-header">
                            Soal {ujian.nama_ujian}
                            <button className="btn btn-primary btn-sm float-right">
                                <Countdown
                                    date={Date.now() + waktu}
                                    renderer={({ hours, minutes, seconds, completed }) => {
                                        if (completed) {
                                            return <span>Selesai</span>;
                                        } else {
                                            return <span>{hours}:{minutes}:{seconds}</span>;
                                        }
                                    }}
                                    onTick={() => { setWaktu(waktu - 1000) }}
                                    onComplete={() => handleOpenModal(
                                        false,
                                        "Waktu ujian sudah berakhir",
                                        route('ujian.selesai', ujian.id)
                                    )}
                                />
                            </button>
                        </div>

                        {/* ------------ BODY SOAL -------------------*/}
                        <div className="card-body" >
                            <div className="row">
                                <div className="col-md-6">
                                    {datasoal[soalkiri].map((soal, index) => (
                                        <>
                                            <table border="0">
                                                <tbody>
                                                    <tr>
                                                        <td><button className="btn btn-primary">{startnumber + index}</button></td>
                                                        
                                                        <td colSpan="4" width="5" style={{ padding: 6 }}> 
                                                            <h3>
                                                                <div dangerouslySetInnerHTML={{ __html: soal.soal }}></div> 
                                                            </h3>
                                                        </td>
                                                    </tr>
                                                    
                                                    <tr>
                                                        <td width="5"></td>
                                                        {pilihan.map((pil, index) => (
                                                            <td key={pil}>
                                                                <td width="5" style={{ padding: 2 }}></td>
                                                                <td width="5" style={{ padding: 2 }}>
                                                                    {pil == soal.jawaban ? ( //cek pilihan sama dengan jawaban
                                                                        <a className="btn btn-primary btn-sm btn-block">{huruf[index]}</a>
                                                                    ) : (
                                                                        <a href="#" className="btn btn-outline-primary btn-sm btn-block"
                                                                            onClick={() => 
                                                                                Inertia.post(
                                                                                route('ujian.jawab', ujian.id),
                                                                                {
                                                                                    soal: soal.id,
                                                                                    jawab: pil,
                                                                                    nosoal: nosoal,
                                                                                    durasi: waktu,
                                                                                    ujian: ujian.id
                                                                                }
                                                                            )}
                                                                        >{huruf[index]}</a>
                                                                    )}
                                                                </td>
                                                                <td style={{ padding: 6 }} dangerouslySetInnerHTML={{ __html: soal["pilihan_" + pil] }}></td>
                                                            </td>
                                                        ))}
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </>
                                    ))}
                                </div>
                                <div className="col-md-6">
                                    {datasoal[soalkanan].map((soal, index) => (
                                        <>
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td><button className="btn btn-primary">{startnumber + 10 + index}</button></td>
                                                        <td colSpan="2" style={{ padding: 6 }}>
                                                            <h3>
                                                                <div dangerouslySetInnerHTML={{ __html: soal.soal }}></div>
                                                            </h3>
                                                        </td>
                                                                
                                                    </tr>
                                                    <tr>
                                                        <td width="2"></td>
                                                            {pilihan.map((pil, index) => (
                                                                <td key={pil}>
                                                                    <td width="5" style={{ padding: 3 }}></td>
                                                                    <td width="5" style={{ padding: 3 }}>
                                                                        {pil == soal.jawaban ? ( //untuk cek pilihan sama dengan jawaban
                                                                            <a className="btn btn-primary btn-sm btn-block">{huruf[index]}</a>
                                                                        ) : (
                                                                            <a href="#" className="btn btn-outline-primary btn-sm btn-block"
                                                                                onClick={() => Inertia.post(
                                                                                    route('ujian.jawab', ujian.id),
                                                                                    {
                                                                                        soal: soal.id,
                                                                                        jawab: pil,
                                                                                        nosoal: nosoal,
                                                                                        durasi: waktu,
                                                                                        ujian: ujian.id
                                                                                    }
                                                                                )}
                                                                            >{huruf[index]}</a>
                                                                        )}
                                                                    </td>
                                                                    <td style={{ padding: 6 }} dangerouslySetInnerHTML={{ __html: soal["pilihan_" + pil] }}></td>
                                                                </td>
                                                            ))}
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* ------------ FOOTER SOAL -------------------*/}
                        <div className="card-footer d-flex justify-content-between">
                            <div>
                                {page > 1 && ( //jika bukan halaman pertama tampilkan tombol sebelumnya
                                    <a onClick={() => setPage(page - 1)} className="btn btn-primary btn-sm">
                                        <i className="fas fa-angle-left"></i> Sebelumnya
                                    </a>
                                )}

                                {page < totalpage && (//jika bukan halaman terakhir tampilkan tombol selanjutnya
                                    <a style={{ marginLeft: 10 }} onClick={() => setPage(page + 1)} className="btn btn-primary btn-sm">
                                        Selanjutnya <i className="fas fa-angle-right"></i>
                                    </a>
                                )}
                            </div>

                            <a className="btn btn-primary btn-danger btn-sm"
                                onClick={() => handleOpenModal(
                                    true,
                                    "Setelah mengakhiri ujian tidak dapat kembali ke ujian ini lagi. Yakin akan mengakhiri ujian?",
                                    route('ujian.selesai', ujian.id)
                                )}
                            >
                                Akhiri Ujian
                            </a>
                        </div>
                    </div>
                </div>

            </div>


            <Modal
                modal={modal}
                closeModal={handleCloseModal}
            />
        </Layout>
    );
}