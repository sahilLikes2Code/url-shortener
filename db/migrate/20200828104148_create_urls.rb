class CreateUrls < ActiveRecord::Migration[6.0]
  def change
    create_table :urls do |t|
      t.text :original
      t.text :shortened

      t.timestamps
    end
  end
end
