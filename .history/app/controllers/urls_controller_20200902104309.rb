class UrlsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @urls = Url.where(pinned: true) + Url.where(pinned: false)
    if @urls
      render status: :ok, json: { notice: 'Urls list', urls: @urls }
    else
      render status: :unprocessable_entity, json: { errors: ['no urls found'] }
    end
  end

  def create
    # check if url already exists
    if url_already_exists?
      render status: :found, json: { errors: 'Shortened url already in list' }
      return
    end

    # create, if url record doesnt exist
    @url = Url.new(url_params)
    random_string = SafeRandom.alphanumeric(5)
    @url[:shortened] = random_string

    if @url.save
      render status: :ok, json: { notice: 'Url shortened successfully' }
    else
      render status: :unprocessable_entity, json: { errors: 'Please enter valid url with http/https prefix' }
    end
  end

  def increase_click_count
    @url = Url.find_by_shortened(params[:url])
    @url.click_count = @url.click_count + 1
    @url.save
  end

  def pin_url
    @url = Url.find_by_shortened(params[:url])
    @url.pinned = @url.pinned == false
    @url.save
  end

  def show
    print 'paramzz'
    print params
    print 'paramzz'
    url = Url.find_by_shortened(params[:id])
    if url
      redirect_to url.original
    else
      redirect_to root_path
    end
  end

  private

  def url_params
    params.require(:url).permit(:original)
  end
end
