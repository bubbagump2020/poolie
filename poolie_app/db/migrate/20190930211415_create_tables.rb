class CreateTables < ActiveRecord::Migration[6.0]
  def change
    create_table :tables do |t|
      t.string :table_name
      t.boolean :multiplayer, default: false
      t.boolean :ranked, default: false



      t.timestamps
    end
  end
end
