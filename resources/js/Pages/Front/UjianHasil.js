import React from 'react';
import Helmet from 'react-helmet';
import { InertiaLink } from '@inertiajs/inertia-react';

import Layout from './../../Shared/UjianLayout';

export default (props) => {
  
  return (
    <Layout>
      <Helmet>
        <title>Selesai Ujian</title>
      </Helmet>
      <div className="row">
        <div className="col-md-8">
            <div className="card">
                <div className="card-header">
                    Selesai Ujian
                </div>
                <div className="card-body">

                  <table className="table">
                      <tbody>
                      <tr>
                        <td><b>No. Ujian</b></td>
                        <td>: {props.peserta.no_ujian}</td>
                      </tr>
                      <tr>
                        <td><b>Nama</b></td>
                        <td>: {props.peserta.nama_peserta}</td>
                      </tr>
                      <tr>
                        <td><b>Nama Instansi</b></td>
                        <td>: {props.peserta.nama_sekolah}</td>
                      </tr>
                      <tr>
                        <td><b>Kelas</b></td>
                        <td>: {props.peserta.kelas}</td>
                      </tr>

                      <tr>
                        <td><b>Nama Ujian</b></td>
                        <td>: {props.ujian.nama_ujian}</td>
                      </tr>
                      <tr>
                        <td><b>Nama Soal</b></td>
                        <td>: {props.ujian.nama_mapel}</td>
                      </tr>
                      
                      <tr>
                        <td><b>Mulai Mengerjakan</b></td>
                        <td>: {props.nilai.mulai}</td>
                      </tr>
                      <tr>
                        <td><b>Selesai Mengerjakan</b></td>
                        <td>: {props.nilai.selesai}</td>
                      </tr>
                    {props.ujian.tampilkan_hasil == 'Y' && (
                      <>
                      <tr>
                        <td><b>Jml. Benar</b></td>
                        <td>: {props.nilai.jml_benar}</td>
                      </tr>
                      <tr>
                        <td><b>Nilai</b></td>
                        <td>: {props.nilai.nilai}</td>
                      </tr>
                      
                      <tr>
                          <td><b>Koreksian </b></td>
                          <td>
                              <button className="item primary" onClick={()=>Inertia.get(route('koreksi', props.peserta.id_peserta))}>
                                    <i className="fas fa-eye">Lihat Jawaban</i>
                              </button> 
                              {/* <InertiaLink href={ route('nilai.view')} className="btn btn-info">
                                  Lihat jawaban
                              </InertiaLink> */}

                                    <InertiaLink href={route('koreksi', { id: props.peserta.id, ujian: props.ujian.id})} className="btn float-right btn-success" target='blank'>
                                        Lihat Jawaban
                                    </InertiaLink>

                          </td>
                      </tr>
                      </>
                    )}
                      <tr><td></td><td></td></tr>
                      </tbody>
                  </table>   

                </div>
                <div className="card-footer">                    
                  <InertiaLink href={route('home')} className="btn float-right btn-success">
                      Daftar Ujian
                  </InertiaLink>                       
                </div>
            </div>
        </div>
    </div>  
    </Layout>
  );
}