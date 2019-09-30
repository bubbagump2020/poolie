class User < ApplicationRecord
    has_secure_password
    has_many :ranked_games
    has_many :unranked_games
    has_many :player_aliases
    has_many :tables, through: :player_aliases
end
