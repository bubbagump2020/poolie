class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :password_digest
      t.integer :ranked_wins
      t.integer :ranked_losses
      t.integer :unranked_wins
      t.integer :unranked_losses


      t.timestamps
    end
  end
end
