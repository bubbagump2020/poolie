class CreateRankedGames < ActiveRecord::Migration[6.0]
  def change
    create_table :ranked_games do |t|
      t.belongs_to :user
      t.boolean :win, default: false

      t.timestamps
    end
  end
end
