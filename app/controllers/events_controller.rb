class EventsController < ApplicationController
	def new
		url = URI("http://rcloud.social/notebook.R/Jenping/WSM")
		http = Net::HTTP.new(url.host, url.port)
		request = Net::HTTP::Get.new(url)

		response = http.request(request)
		@best = response.read_body.split('@')[0].split(',')
		# byebug
	end
end
