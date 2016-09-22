class WelcomeController < ApplicationController
	before_action :authenticate_user!

  def home
  	# @code = "123"

  	# @code = ENV["pusher_app_id"]
  end
end
