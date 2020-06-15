<?php

use App\Models\Item;
use Illuminate\Database\Seeder;

class InsertDefaultItems extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('items')->insert([
            ['title' => 'Lâmpadas', 'image' => 'lampadas.svg'],
            ['title' => 'Pilhas e baterias', 'image' => 'baterias.svg'],
            ['title' => 'Papéis e Papelão', 'image' => 'papeis-papelao.svg'],
            ['title' => 'Resíduos Eletrônicos', 'image' => 'eletronicos.svg'],
            ['title' => 'Resíduos Orgânicos', 'image' => 'organicos.svg'],
            ['title' => 'Óleo de Cozinha', 'image' => 'oleo.svg'],
        ]);
    }
}
