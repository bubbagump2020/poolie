module ApplicationCable
  class Connection < ActionCable::Connection::Base
    # In this class, we authorize the incoming connection and
    # proceed to establish it if the user can be identified
    identified_by :current_user

    def connect
      self.current_user = find_verified_user
      logger.add_tags 'ActionCable', current_user.username
    end

    private
      def find_verified_user
        if find_verified_user = User.find_by(id: cookies.signed[:user_id])
          verified_user
        else
          reject_unauthorized_connection
        end
      end

  end
end
