class CreateEightBalls < ActiveRecord::Migration[6.0]
  def change
    create_table :eight_balls do |t|

      t.timestamps
    end
  end
end
