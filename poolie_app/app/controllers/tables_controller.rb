class TablesController < ApplicationController
   def index
    @user_id = session[:id]
    @tables = Table.all
   end

   def new
    
   end

   def create
      @table = Table.create({
         table_name: params[:table_name],
         multiplayer: params[:multiplayer],
         ranked: params[:ranked]
      })
   end
end