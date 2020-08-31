class ApplicationController < ActionController::Base

  def url_already_exists?
    !!Url.find_by_original(params[:url][:original])
  end
end
