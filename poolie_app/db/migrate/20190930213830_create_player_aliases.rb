class CreatePlayerAliases < ActiveRecord::Migration[6.0]
  def change
    create_table :player_aliases do |t|
      t.belongs_to :user
      t.belongs_to :table

      t.timestamps
    end
  end
end
