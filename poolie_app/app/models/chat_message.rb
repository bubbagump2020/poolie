class ChatMessage < ApplicationRecord
  belongs_to :room, inverse_of: :chat_messages
  belongs_to :user
end
