class AddClickCountToUrls < ActiveRecord::Migration[6.0]
  def change
    add_column :urls, :click_count, :integer, default: 0
  end
end
