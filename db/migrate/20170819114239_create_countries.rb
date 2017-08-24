class CreateCountries < ActiveRecord::Migration
  def change
    create_table :countries do |t|
    	t.integer :place
    	t.string :sing_name
    	t.string :cover
    	t.string :autor
    	t.string :url
    	t.string :genre
    	t.string :country
    	t.float :raiting
    	t.string :year
    	t.text :description
    	t.timestamps null: false
    end
  end
end
