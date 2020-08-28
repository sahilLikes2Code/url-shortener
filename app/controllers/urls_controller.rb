class UrlsController < ApplicationController


  def index
    @urls = Url.all
    # render
  end


  def show
    @urls = Url.all
    # render 'show'
    # render status: :ok, json: {urls: @urls}
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


  private

  def url_params
    params.require(:url).permit(:original)
  end
end
