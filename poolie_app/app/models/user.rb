class User < ApplicationRecord
    has_secure_password
    has_many :ranked_games
    has_many :unranked_games
end
