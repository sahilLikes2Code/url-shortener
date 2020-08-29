class Url < ApplicationRecord
  validates :shortened, presence: true
  validates :original, presence: true, uniqueness: true
  validates_format_of :original, :with => /\A(http|https):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?\z/ix
end
