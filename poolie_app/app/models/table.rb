class Table < ApplicationRecord
    has_many :player_aliases
    has_many :users, through: :player_aliases
end
