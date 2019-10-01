class UsersController < ApplicationController
   def new
    @user = User.new
   end

   def create
    @user = User.create({
        email: params[:email],
        username: params[:username],
        password: params[:password]
    })
   end
end