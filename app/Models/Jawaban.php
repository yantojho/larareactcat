<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Jawaban extends Model
{

   protected $table = 'jawaban';
   protected $fillable = [
      'id_peserta',
      'id_ujian',
      'id_soal',
      'urut',
      'pilihan',
      'jawaban',
      'hasil',
    ];

    public function peserta(){
      return $this->belongsTo(Peserta::class, 'id_peserta');
    }
}
