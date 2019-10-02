class Chat < ApplicationRecord
	has_man :chat_messages, dependent: :destroy,
							inverse_of: :room
end
