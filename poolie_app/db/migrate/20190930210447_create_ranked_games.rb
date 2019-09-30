class CreateRankedGames < ActiveRecord::Migration[6.0]
  def change
    create_table :ranked_games do |t|

      t.timestamps
    end
  end
end
