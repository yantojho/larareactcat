import React from 'react';
import Helmet from 'react-helmet';
import { InertiaLink, useForm } from '@inertiajs/inertia-react';

import Layout from './../../Shared/Layout';

export default (props) => {
  //state untuk nilai input form
  const {data, setData, post, processing, errors } = useForm({
    no_ujian: "",
    nama_peserta: "",
    jenis_kelamin: "L",
    nama_sekolah: "",
    kelas: "",    
    password: "",
  });

  //pilihan jenis kelamin
  const optionKelamin = [
    {val: "L", text: "Laki-laki"},
    {val: "P", text: "Perempuan"}
  ];

  //buat array untuk membuat skrip kotak input lebih pendek dengan perulangan
  const arrayInput = [
    {label: 'No. Ujian', name: 'no_ujian', type:"text", size: 4},
    {label: 'Nama Peserta', name: 'nama_peserta', type:"text", size: 6},
    {label: 'Jenis Kelamin', name: 'jenis_kelamin', type:"select", size: 2, option: optionKelamin},
    {label: 'Nama Sekolah', name: 'nama_sekolah', type:"text", size: 6},
    {label: 'Kelas', name: 'kelas', type:"text", size: 3},
    {label: 'Password', name: 'password', type:"password", size: 4},
  ];

  //menangani perubahan nilai input pada form
  function handleChange(e){
    const key = e.target.name;
    const value = e.target.value;

    setData(data => ({
      ...data,
      [key]: value,
    }))
  }

  //mengirim data ketika form submit
  function handleSubmit(e){
    e.preventDefault()
    post(route('admin.peserta.store'), data)
  }

  return (
    <Layout>
      <Helmet title="Tambah Peserta" />
      <div className="row">
        <div className="col-lg-12">
          <div className="user-data">
            <h3 className="title-3">
                Tambah Peserta
            </h3>

            <div  style={{padding: 30}}>
            <div className="alert alert-info">Jika password dikosongin, password akan dibuat oleh sistem.</div>
            <form className="form-horizontal" onSubmit={handleSubmit}>
                
                {/*buat kotak input sesuai jumlah array input */}
                {arrayInput.map((inp)=>(
                    <div key={inp.name} className="row form-group">
                        <div className="col col-md-2">
                            <label htmlFor={inp.name} className=" form-control-label">{inp.label}</label>
                        </div>
                        <div className={"col-md-"+inp.size}>
                        {inp.type == "select" ? ( //jika tipe input select

                            <select d={inp.name} name={inp.name}
                                className={"form-control " + (errors[inp.name] ? 'is-invalid' : '')}
                                value={data[inp.name]}
                                onChange={handleChange}
                            >
                            {inp.option.map((opt)=>(
                                <option key={opt.val} value={opt.val}>{opt.text}</option>
                            ))}
                            </select>
                        ):( //jika tipe input selain select
                            <input type={inp.type} id={inp.name} name={inp.name} placeholder={inp.label} 
                                className={"form-control " + (errors[inp.name] ? 'is-invalid' : '')}
                                value={'value' in inp ? inp.value : data[inp.name]}
                                onChange={handleChange}
                            />
                        )}
                        
                            {errors[inp.name] && (
                                <small className="form-text text-danger">{errors[inp.name]}</small>
                            )}
                        </div>
                    </div>
                )) }
                
                <button type="submit" className="btn btn-primary" style={{marginRight: 10}} disabled={processing}>
                    <i className="fa fa-save"></i> Simpan
                </button>
                <InertiaLink href={route('admin.peserta.index')} className="btn btn-danger">
                    <i className="fa fa-ban"></i> Batal
                </InertiaLink>
            </form>
            </div>  
          </div>
        </div>
      </div>
    </Layout>
  )
};
