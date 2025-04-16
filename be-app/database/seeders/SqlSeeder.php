<?php

namespace Database\Seeders;


use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class SqlSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $path = database_path('sql/db_seeder.sql');
        $sql = File::get($path);

        DB::unprepared($sql);
        
        $this->command->info('Database seeded from SQL file!');
    }
}
