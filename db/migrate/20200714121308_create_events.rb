class CreateEvents < ActiveRecord::Migration[6.0]
  def change
    create_table :events do |t|
      t.string :name, null: false
      t.boolean :paid, null: false, default: false
      t.integer :cost, null: false, default: 0
      t.boolean :active, null: false, default: false
      t.timestamp :registration_from, null: false
      t.timestamp :registration_to, null: false
      t.timestamp :date, null: false

      t.timestamps
    end
  end
end
