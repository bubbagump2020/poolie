class CreateUnrankedGames < ActiveRecord::Migration[6.0]
  def change
    create_table :unranked_games do |t|

      t.timestamps
    end
  end
end
