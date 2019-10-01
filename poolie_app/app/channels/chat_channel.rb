class ChatChannel < ApplicationCable::Channel
    # Called when the consumer has successfully
    # become a subscriber to this channel
    def subscribed
        stream_from "chat_#{params[:room]}"
    end

    # If i have a stream that is related to a model
    # then the broadcasting used can be generated from the 
    # model and channel

end