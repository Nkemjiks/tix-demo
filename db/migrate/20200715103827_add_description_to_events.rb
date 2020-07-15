class AddDescriptionToEvents < ActiveRecord::Migration[6.0]
  def change
    add_column :events, :description, :text, null: false
  end
end
