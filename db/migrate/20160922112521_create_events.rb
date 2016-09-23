class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.integer :user_id, index: true, foreign_key: true
      t.text :description

      t.timestamps null: false
    end
  end
end
