class UrlsController < ApplicationController

  skip_before_action :verify_authenticity_token

  def index
    @urls = Url.all
    if @urls
      render status: :ok, json: {notice: 'Polls list', urls: @urls}
    else
      render status: :unprocessable_entity, json: {errors: ['nothing found']}
    end
  end


  def create
    @url = Url.new(url_params)
    random_string = SafeRandom.alphanumeric(5)
    @url[:shortened] = random_string
    if @url.save
      render status: :ok, json: {notice: 'Url successfully shortened'}
    else
      render status: :unprocessable_entity, json: {errors: ['Please enter valid url with http or https prefix']}
    end
  end

  def update
    @url = Url.find_by_shortened(params[:url])
    @url.click_count = @url.click_count + 1
  end


  private

  def url_params
    params.require(:url).permit(:original)
  end
end
