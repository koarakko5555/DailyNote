class CreatePlans < ActiveRecord::Migration[8.0]
  def change
    create_table :plans do |t|
      t.string :title
      t.date :start_date
      t.date :end_date
      t.text :content

      t.timestamps
    end
  end
end
